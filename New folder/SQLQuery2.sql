with userD as (
select * from [dbo].[UsersData]
),
tracker as (
select * from [dbo].[TrackerData]
),
training as (
select * from [dbo].[TrainingData]
),
trainer as (
select * from [dbo].[TrainerData]
)

select u.userId, CONCAT(u.firstName, ' ', u.lastName) as "Name", u.email, u.gender, u.specializations, u.doj,
u.state,u.experience, t.trainingId, t.trainingName, t.trainerId, t.trainerName, t.optimizedDuration, tr.trainingStatus, tr.assessment_percentage_done,
tr.assessment_completion_time_in_hours, tr.scoreAchievedInQuiz, tr.quizPassedOrFailed, tr.ratingGivenByTrainer
INTO AdminUniqueUserView
from userD u left join tracker tr on u.userId = tr.userId 
left join training t on tr.trainingId = t.trainingId
left join trainer on u.userId = trainer.userId
