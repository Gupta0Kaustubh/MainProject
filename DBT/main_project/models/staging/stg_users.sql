{{ config(
    tags=['staging']
) }}

WITH required_fields AS (
    SELECT *
    FROM {{ source('Main_Project', 'userdatas') }}
),
datatype_and_renamed AS (
    SELECT
        userId,
        CONCAT(firstName, ' ', lastName) as fullName,
        email,
        phoneNumber,
        gender,
        doj,
        specializations,
        dob,
        city,
        state,
        TRY_TO_NUMBER(experience) as experience,
        userType,
        subscribeNewsletter
    FROM required_fields
)

SELECT
    USERID,
    FULLNAME,
    EMAIL,
    PHONENUMBER,
    GENDER,
    DOJ,
    REGEXP_REPLACE(VALUE, '[,'']', '') AS SPECIALIZATION,
    DOB,
    CITY,
    STATE,
    EXPERIENCE,
    USERTYPE,
    SUBSCRIBENEWSLETTER
FROM datatype_and_renamed
CROSS JOIN LATERAL FLATTEN(INPUT => SPLIT(SPECIALIZATIONS, ',')) AS specialization_split
