{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'quizdatas') }}
),
datatype_and_renamed AS (
    SELECT
        quizName,
        trainingId,
        trainingName,
        TRY_TO_NUMBER(maxScores) as maxScores,
        TRY_TO_NUMBER(minScores) as minScores,
        difficultyLevel
    FROM required_fields
)
SELECT * FROM datatype_and_renamed
