select u.userId, u.fullName, u.gender, u.dob, u.doj, 
u.specialization, u.city, u.state, u.experience, u.userType, tr.trainingId, t.trainingName, tr.trainingStatus, 
t.optimizedDuration, t.startDate, t.endDate,
tt.userId as 'TrainerId', tt.trainerName, tt.trainerDesignation,
q.difficultyLevel, tr.assessment_completion_time_in_hours, tt.trainerSpecialization, tr.assessment_percentage_done,
tr.quizPassedOrFailed, tr.ratingGivenByTrainer, tr.scoreAchievedInQuiz
into TotalInfo
from Users u join tracker_data tr on tr.userId = u.userId
join trainings_data t on t.trainingId = tr.trainingId
join trainers_data tt on tt.userId = t.trainerId 
join quiz_data q on q.trainingId = t.trainingId