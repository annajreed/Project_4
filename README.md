# Project_4
Machine learning project

Steps to run the HTML web application:

  *  Clone the repository to the local folder.
  *  Go to your terminal and find the location where the index.html file is.
  *  type: python -m http.server (to run the local server)
  *  From your local folder open the "index.html" file.
  *  Once the HTML browser opens clear the browser and type: localhost:8000 ( to run the web application)

Statistics of Poisonous Mushrooms

Our goal is to see if it is possible to predict whether the mushroom is 
poisonous from a this given dataset https://www.kaggle.com/datasets/uciml/mushroom-classification.
We perform three test logistic regression, decision tree, and a random tree. 
The output from the logistic regression goes as followed.
TEST RESULTS:

Accuracy Score: 0.9581624282198523
Classification Report: 
              
              precision    recall  f1-score   support

           0       0.96      0.96      0.96       647
           1       0.96      0.95      0.96       572

    accuracy                           0.96      1219
    macro avg       0.96      0.96      0.96      1219
    weighted avg       0.96      0.96      0.96      1219


The output from the Decision Tree
TESTING RESULTS:

Accuracy Score: 100.0
Classification Report:
               
               precision    recall  f1-score   support

           0       1.00      1.00      1.00       647
           1       1.00      1.00      1.00       572

    accuracy                           1.00      1219
    macro avg       1.00      1.00      1.00      1219
    weighted avg       1.00      1.00      1.00      1219


The output from the Random Forest
TESTING RESULTS:

Accuracy Score: 100.0
Classification Report:

              precision    recall  f1-score   support

           0       1.00      1.00      1.00       647
           1       1.00      1.00      1.00       572

    accuracy                           1.00      1219
    macro avg       1.00      1.00      1.00      1219
    weighted avg       1.00      1.00      1.00      1219


This is the output with the neural network
model_loss, model_accuracy = nn.evaluate(X_test_scaled,y_test,verbose=2) print(f"Loss: {model_loss}, Accuracy: {model_accuracy}") 
64/64 - 0s - loss: 7.0568e-05 - accuracy: 1.0000 - 225ms/epoch - 4ms/step
Loss: 7.056775939418003e-05, Accuracy: 1.0

The output for logistic regression, decision tree, and random tree has a suspiciously high accuracy score. 
We suspect a degree of overfitting. We therefore perform two sample t-test for each variable;   
each variable is statistically significant. This is somewhat concerning until I discovered multicollinearity. 

Multicollinearity is when variables are highly correlated with each other. The correlation between each variable will skew the data and the t-test. 
The method to measure multicollinearity is called the variance inflation factor or VIF for short.
According National Library of Medicine, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6713981/, if the VIF is greater than five, than a correlation is present. 

                   variable         VIF
                  cap-shape    5.463186
                cap-surface    3.904712
                  cap-color    5.950600
                    bruises    7.984231
                       odor    8.918271
            gill-attachment  256.122838
               gill-spacing    4.534113
                  gill-size    5.758180
                 gill-color    6.284702
                stalk-shape    9.243136
                stalk-root    8.129864
    stalk-surface-above-ring   11.707764
    stalk-surface-below-ring   11.768772
    stalk-color-above-ring   17.163156
    stalk-color-below-ring   17.215182
                veil-color  280.123888
               ring-number   65.370463
                 ring-type   13.429124
         spore-print-color   16.937589
               population   21.434074
                   habitat    2.800932

All the variables correlated to one another. Remember what the dataset is, it’s a list of mushroom species categorized by its features. 
So why wouldn’t features of a mushroom be correlated to one another.Let us also consider species of mushrooms being related to one another. 
Therefore, the output is not unexpected. However, let’s see what happens when we remove variables that are highly correlated with one another. 
Let’s exclude variables that have a VIF score greater than 10. 

Logistic Regression

TEST RESULTS:
Accuracy Score: 0.8360

Classification Report:
              
              precision    recall  f1-score   support

           0       0.98      0.70      0.82      1059
           1       0.75      0.98      0.85       972

    accuracy                           0.84      2031
    macro avg       0.86      0.84      0.83      2031
    weighted avg       0.87      0.84      0.83      2031


DecisionTree

Test RESULTS:

Accuracy Score: 0.6760

Classification Report:
              
              precision    recall  f1-score   support

           0       0.75      0.56      0.64      1059
           1       0.63      0.80      0.70       972

    accuracy                           0.68      2031
    macro avg       0.69      0.68      0.67      2031
    weighted avg       0.69      0.68      0.67      2031


Random Forest
Test RESULTS:

Accuracy Score: 0.6519

Classification Report:
              
              precision    recall  f1-score   support

           0       0.83      0.42      0.56      1059
           1       0.59      0.90      0.71       972

    accuracy                           0.65      2031
    macro avg       0.71      0.66      0.64      2031
    weighted avg       0.71      0.65      0.63      2031



Neural Network
model_loss, model_accuracy = nn.evaluate(X_test_scaled,y_test,verbose=2) print(f"Loss: {model_loss}, Accuracy: {model_accuracy}") 
64/64 - 0s - loss: 8.3531e-05 - accuracy: 1.0000 - 297ms/epoch - 5ms/step
Loss: 8.353116572834551e-05, Accuracy: 1.0

