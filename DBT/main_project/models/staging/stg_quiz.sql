{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'quiz_data') }}
),
datatype_and_renamed AS (
    SELECT
        quizName,
        trainingId,
        trainingName,
        case when isnumeric(maxScores) = 1 then convert(int, maxScores) else null end as maxScores,
        case when isnumeric(minScores) = 1 then convert(int, minScores) else null end as minScores,
        difficultyLevel
    FROM required_fields
)
SELECT * FROM datatype_and_renamed;
