{{
    config(
        tags=['mart']
    )
}}

WITH tracker AS (
    select * FROM {{ref('stg_tracker')}} where trainingStatus!= 'pending'
),
quiz as (
select * from {{ref('stg_quiz')}}
),
first_output as (
select 
    q.difficultyLevel,tr.trainingId, 
    COUNT(userId) AS TotalUsers,
	Dense_RANK() OVER (PARTITION BY q.difficultyLevel ORDER BY COUNT(userId) DESC) AS Rank,
    SUM(CASE WHEN quizPassedOrFailed = 'passed' THEN 1 ELSE 0 END) AS PassedUsers,
    SUM(CASE WHEN quizPassedOrFailed = 'failed' THEN 1 ELSE 0 END) AS FailedUsers,
    SUM(CASE WHEN quizPassedOrFailed IS NULL THEN 1 ELSE 0 END) AS UsersWithOngoingTraining
FROM tracker tr join quiz q on tr.trainingId = q.trainingId 
GROUP BY q.difficultyLevel ,tr.trainingId
),
trainings as (
select * from {{ref('stg_trainings')}}
)

select difficultyLevel, f.trainingId, trainingName, TotalUsers, PassedUsers, FailedUsers, UsersWithOngoingTraining 

from first_output f left join trainings t on t.trainingId = f.trainingId where Rank <=5
order by difficultyLevel, TotalUsers desc
