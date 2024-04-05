{{
    config(
        tags=['mart']
    )
}}

WITH SpecializationMaxExperience AS (
    SELECT specialization, userId, fullName, experience,
        ROW_NUMBER() OVER (PARTITION BY specialization ORDER BY experience DESC) AS row_num
    FROM {{ref('stg_users')}}
)
SELECT top 150 specialization, userId, fullName, experience
FROM SpecializationMaxExperience 
WHERE row_num = 1 and experience >=10 order by experience desc
