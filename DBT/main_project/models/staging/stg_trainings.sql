{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'trainings_data') }}
),
datatype_and_renamed AS (
    SELECT
        trainingId,
        trainingName,
        trainingDescription,
        trainerId,
        CONVERT(date, startDate) AS startDate,
        CONVERT(date, enddate) AS enddate,
        case when isnumeric(optimizedDuration) = 1 then convert(int, optimizedDuration) else null end as optimizedDuration,
        timingOfTraining,
        CONVERT(date, createdAt) AS createdAt
    FROM required_fields
)
SELECT * FROM datatype_and_renamed;
