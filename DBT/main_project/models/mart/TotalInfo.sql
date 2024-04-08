with users as (
select * from {{ ref('stg_users') }}
),
trainers as (
select * from {{ ref('stg_trainers') }}
),
trainings as (
select * from {{ ref('stg_trainings') }}
),
quiz as (
select * from {{ ref('stg_quiz') }}
),
tracker as (
select * from {{ ref('stg_tracker') }}
)

select u.*, tr.trainingId, tr.trainerId,
tt.trainerName, tt.trainerDesignation, tt.trainerRating, tt.trainerSpecialization,
t.trainingName, t.optimizedDuration, 
q.difficultyLevel, 
tr.trainingStatus, tr.assessment_percentage_done, tr.assessment_completion_time_in_hours
, tr.scoreAchievedInQuiz, tr.quizPassedOrFailed, tr.ratingGivenByTrainer
from users u left join tracker tr on u.userId = tr.userId 
left join trainings t on t.trainingId = tr.trainingId
left join trainers tt on tt.userId = t.trainerId
left join quiz q on q.trainingId = t.trainingId