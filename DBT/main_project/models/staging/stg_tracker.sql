{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'tracker_data') }}
),
datatype_and_renamed AS (
    SELECT
        userId,
        trainingId,
        trainerId,
        trainingStatus,
        case when isnumeric(assessment_percentage_done) = 1 then convert(int, assessment_percentage_done) else null end as assessment_percentage_done,
        case when isnumeric(assessment_completion_time_in_hours) = 1 then convert(float, assessment_completion_time_in_hours) else null end as assessment_completion_time_in_hours,
        case when isnumeric(scoreAchievedInQuiz) = 1 then convert(int, scoreAchievedInQuiz) else null end as scoreAchievedInQuiz,
        quizPassedOrFailed,
        case when isnumeric(ratingGivenByTrainer) = 1 then convert(int, ratingGivenByTrainer) else null end as ratingGivenByTrainer
    FROM required_fields
)
SELECT * FROM datatype_and_renamed;
