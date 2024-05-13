{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'trainings') }}
),
datatype_and_renamed AS (
    SELECT
        trainingId,
        trainingName,
        trainingDescription,
        trainerId,
        TO_DATE(startDate) AS startDate,
        TO_DATE(enddate) AS enddate,
        TRY_TO_NUMBER(optimizedDuration) as optimizedDuration,
        timingOfTraining,
        TO_DATE(createdAt) AS createdAt
    FROM required_fields
)
SELECT * FROM datatype_and_renamed
