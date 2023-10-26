# 2023_ZT_HistoricalClimateData
9/2023 ~ 6/2024 專題 with topic : Historical Climate Data

Anything related to this 專題 will be posted here. For more important documents that are confidential will be locked with a password.
Please ask me for the password if you need to access the file.
## ---10/25---
NOTES FROM DISCUSSION WITH PROFESSOR WANG TODAY:
1. Order of the PPT
- First talk about the Dataset -> Introduce what the dataset is about, what kind of data they have, where they get the dataset
- Why the senior want to do this project? (what is his problem statement) and also what he's done.
     - About the problem statement one thing that maybe you can say the dataset is very large and have different type of variables, also there are variables that relies on time and location that is why it is necessary to make a visualization tool to show these variables effectively.
- After that say what are the things you want to improve from the senior project
     - Missing function from Senior's work, one example is lets say the user want to analyze only from a certain period of time you cannot do that in the senior's tool. Using plotly you also cannot do this (first show the whole time line and then filtering only the time you want to see) so that is why you want to change it to D3
     - No interaction, one example is the user want to see the specific line in the line chart and show it in heatmap they cannot do that in senior's tool. Using plotly you can do this (simple interaction is available in plotly) but a more complicated the filter you want (maybe only a moment of time and a few cities) will not be possible in plotly so you can say that its important to change it to D3 to make sure that you can do more complicated filter in the future.
     - Plotly inflexibility, since plotly is easy but not flexible there are things you want to improve like network that is just not possible in Plotly and that is why you need the D3.

2. The key is not to say you want to change plotly to D3 but to say that you thing there are things you can improve from the tool and these improvements are only available in D3 thats why we want to change it to D3.

3. Some questions that might come up from the professor:
     - This project is something that the senior already do, why do you think its bad? Or why do you think its necessary to change it to D3?
     - They'll ask more about the dataset. Where is it from? What is it about? How big is the dataset? How many columns to how many rows? What are some features you can find from the dataset
     - If the profesor ask anything about the senior work and you think its missing or you cannot answer just say you're still in contact with the senior but its a little bit hard to go back and forth due to him already graduated.
If you have time prepare a few answers you think they might ask
  
4. Also for future plans especially next semester maybe you can say something a little bit high but vague is okay. If the professors asked about the future plans question you can say its something you're still discussing

## ---10/15---
We made the decision to continue senior's thesis work. Now the whole idea becomes:
1. Explain what the senior had already made
2. Explain what you think can be improved from what he made
3. Explain that due to the limitation of the platform he uses (Plotly), these improvements cannot be made.
4. Thus, we will need to change his code from the old platform to a new more flexible platform (D3.js).

For step 1,
There are requirements that you need to do to explain his work (or any research work in general):
1. Understand the paper
   - What are the motivation for the study?
   - What is the problem they are trying to solve?
   - Why is it important to use visualization?
2. Understand the code/tool
   - Why he uses the graphs that he use?
   - What kind of information can you gain from the tool?

For step 2,
After you have some understanding of what the author did and why, the next step will be to think logically.
  - Are there any flaw from what he's saying/ his methods?
  - Do you think there are a better way to do what the he's doing? Maybe its not efficient, maybe it doesn't make sense
  - Are there any new methods that would give additional information that he didn't try to do?

For step 3,
After finding problems/things to improve from what the senior already did you have to carefully explain why we need to move platform:
1. Explain what plotly is
2. Explain the limitation of plotly and why it won't work to do what we want to do (plus point if you have proof, maybe you already try and show that yes it won't work in plotly)
3. Explain how D3 can solve your problem

For step 4,
Other than wrapping up the whole idea of what you're going to do in your project, another important thing would be to say about your expected timeline. Set a checkpoint by yourself it can be either every presentation date or every months,weeks.

## ---9/12---
For now, there are 2 directions that we can try to do:

### 1. Webtool Project
For the webtool project basically the owner of the dataset 林老師 asked us to create a simple web-based tool to explore the dataset. This includes making a simple overall view of the dataset.

Some example links of what the lab already did:
1. Early version of the tool (http://140.122.185.208/~lienathania/HistoricalClimate/climate_tia_ver5.20.11/) Created by: Me
2. Final version of the tool (http://140.122.185.208/~andy0325/climate_new6/) Created by: 安隆

### 2. Continuing Senior 榕宸 Thesis Work
For now what you can do for this is read his thesis work and see if you understand what the whole project is about.

---
If there is anything you need from me please let me know, I'll be happy to help

Sincerely,
Tia
