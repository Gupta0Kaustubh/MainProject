{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'trainers_data') }}
),
datatype_and_renamed AS (
    SELECT
        userId,
        trainerName,
        trainerDesignation,
        case when isnumeric(trainerRating) = 1 then convert(int, trainerRating) else null end as trainerRating,
        trainerSpecialization
    FROM required_fields
)
SELECT * FROM datatype_and_renamed;
