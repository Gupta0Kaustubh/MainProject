{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'trackers') }}
),
datatype_and_renamed AS (
    SELECT
        userId,
        trainingId,
        trainerId,
        trainingStatus,
        TRY_TO_NUMBER(assessment_percentage_done) as assessment_percentage_done,
        TRY_TO_NUMBER(assessment_completion_time_in_hours) as assessment_completion_time_in_hours,
        TRY_TO_NUMBER(scoreAchievedInQuiz) as scoreAchievedInQuiz,
        quizPassedOrFailed,
        TRY_TO_NUMBER(ratingGivenByTrainer) as ratingGivenByTrainer
    FROM required_fields
)
SELECT * FROM datatype_and_renamed
