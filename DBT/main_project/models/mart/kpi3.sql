{{
    config(
        tags=['mart']
    )
}}

with tracker as (
select * from {{ref('stg_tracker')}} where trainingStatus = 'completed'
), 
trainings AS (
    SELECT * FROM {{ref('stg_trainings')}}
),
firstoutput as(
select tr.userId, t.trainingName, t.optimizedDuration, tr.assessment_completion_time_in_hours, 
tr.scoreAchievedInQuiz, tr.ratingGivenByTrainer 
from tracker tr left join trainings t on t.trainingId = tr.trainingId
)

select top 100 f.userId, f.trainingName, f.scoreAchievedInQuiz, f.ratingGivenByTrainer, 
cast(((f.optimizedDuration / f.assessment_completion_time_in_hours)*100) as int) as 'UserEfficiency_OutOf100' 
from firstoutput f where f.scoreAchievedInQuiz >= 50 and f.ratingGivenByTrainer >= 3
AND ((f.optimizedDuration / f.assessment_completion_time_in_hours) * 100) >=200
order by ((f.optimizedDuration / f.assessment_completion_time_in_hours) * 100) desc