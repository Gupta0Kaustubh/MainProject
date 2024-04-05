{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'users_data') }}
),
datatype_and_renamed AS (
    SELECT
        userId,
        CONCAT(firstName, ' ', lastName) as fullName,
        email,
        phoneNumber,
        gender,
        CONVERT(date, doj)         AS doj,
        specializations,
        CONVERT(date, dob)         AS dob,
        city,
        state,
        case when isnumeric(experience) = 1 then convert(float, experience) else null end as experience,
        userType,
        subscribeNewsletter
    FROM required_fields
), 
Specializations AS (
    SELECT 
        userId,
        fullName,
        email,
        phoneNumber,
        gender,
        doj,
        value AS specialization,
        dob,
        city,
        state,
        experience,
        userType,
        subscribeNewsletter
    FROM 
        datatype_and_renamed
    CROSS APPLY 
        STRING_SPLIT(specializations, ',') AS s
)

SELECT 
userId,
    fullName,
    email,
    phoneNumber,
    gender,
    doj,
    Replace(REPLACE(specialization, '[', ''), ']', '') AS specialization,
    dob,
    city,
    state,
    experience,
    userType,
    subscribeNewsletter
 FROM Specializations;
