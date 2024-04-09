{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'trainers') }}
),
datatype_and_renamed AS (
    SELECT
        userId,
        trainerName,
        trainerDesignation,
        TRY_TO_NUMBER(trainerRating) as trainerRating,
        trainerSpecialization
    FROM required_fields
)
SELECT * FROM datatype_and_renamed
