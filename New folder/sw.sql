with userD as (
select * from [dbo].[user_data$]
),
tracker as (
select * from [dbo].[tracker_data$]
),
training as (
select * from [dbo].[training_data$]
),
trainer as (
select * from [dbo].[trainer_data$]
)

--select * from userD u join tracker t on u.userId = t.userId

select u.userId, CONCAT(u.firstName, ' ', u.lastName) as "Name", u.email, u.gender, u.specializations, u.doj,
u.state,u.experience, t.trainingId, t.trainingName, t.trainerId, t.trainerName, t.optimizedDuration, tr.trainingStatus, tr.assessment_percentage_done,
tr.assessment_completion_time_in_hours, tr.scoreAchievedInQuiz, tr.quizPassedOrFailed, tr.ratingGivenByTrainer
INTO AdminUniqueUserView
from userD u left join tracker tr on u.userId = tr.userId 
left join training t on tr.trainingId = t.trainingId
left join trainer on u.userId = trainer.userId

--INTO AdminUniqueUserView
