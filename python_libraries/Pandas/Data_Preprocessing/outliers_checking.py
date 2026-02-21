import numpy as np
import pandas as pd

df = pd.read_csv("Housing.csv")

## separating numerical data from the categorical data

num_cols = df.select_dtypes(include=['int64', 'float64']).columns
print(num_cols)
#Index(['price', 'area', 'bedrooms', 'bathrooms', 'stories', 'parking'], dtype='str')

cat_cols = df.select_dtypes(include=['object']).columns
print(cat_cols)
# Index(['mainroad', 'guestroom', 'basement', 'hotwaterheating',
#        'airconditioning', 'prefarea', 'furnishingstatus'],
#       dtype='str')




outlier_summary = {}

# Loop through the columns again to apply the fix
for col in num_cols:
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    
    lower_bound = Q1 - (1.5 * IQR)
    upper_bound = Q3 + (1.5 * IQR)
    
    outliers = df[(df[col] < lower_bound) | (df[col] > upper_bound)]
    outlier_summary[col] = len(outliers)
    # The magic line that caps the extreme values
    df[col] = df[col].clip(lower=lower_bound, upper=upper_bound)

print("Outliers have been successfully clipped!")
