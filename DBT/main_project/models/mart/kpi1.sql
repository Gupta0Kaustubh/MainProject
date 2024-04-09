{{ 
  config(
    tags=['mart']
  ) 
}}

WITH trainings AS (
  SELECT * FROM {{ ref('stg_trainings') }}
),
quiz AS (
  SELECT * FROM {{ ref('stg_quiz') }}
),
tracker AS (
  SELECT * FROM {{ ref('stg_tracker') }} WHERE trainingStatus = 'completed'
), 
firstoutput AS (
  SELECT 
    t.trainingName, 
    q.difficultyLevel, 
    AVG(t.optimizedDuration) AS optimizedDuration_in_hours, 
    AVG(tr.assessment_completion_time_in_hours) AS avg_assessment_completion_time_in_hours
  FROM 
    trainings t 
  LEFT JOIN 
    quiz q ON t.trainingId = q.trainingId
  LEFT JOIN 
    tracker tr ON tr.trainingId = t.trainingId
  GROUP BY 
    q.difficultyLevel, 
    t.trainingName
)

SELECT top 100
  f.trainingName, 
  f.difficultyLevel, 
  CAST(((f.optimizedDuration_in_hours / f.avg_assessment_completion_time_in_hours) * 100) AS INT) AS UserEfficiency_OutOf100 
FROM 
  firstoutput f
WHERE 
  ((f.optimizedDuration_in_hours / f.avg_assessment_completion_time_in_hours) * 100) >= 100
ORDER BY 
  ((f.optimizedDuration_in_hours / f.avg_assessment_completion_time_in_hours) * 100) DESC
