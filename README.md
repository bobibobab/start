# Financial Ledger

## Specification Deliverable

### Elevator pitch

Do you remember how much you spent your money in this month? Many people have trouble to keep track their comsumption. Because of this problem, many people spent their moeny more than they expected. This financial ledger application helps the users keep track thier comsumption, and calculate their total of comsumption. Each user can make their financial ledger and input their expenditures and income. After that, this application makes total comsumption as a graph.

### Design
This is the main page.
<br>
![Main page of this application](/main.png)
<br>
This is the page when the users loged in and select a specific month.
<br>
![Page1 of this application](/page1.png)

### Key features

* Secure login over HTTPS
* Ability to select the months and days
* Store data what the user spent
* Display the graph of what the user spent in a month
* Ability to calculate the total
* Keep track the current date

### Technologies

I am goinig to user the required technologies in the following ways.

* **HTML** - Uses correct HTML structure for application. Many HTML pages for one for login and the others for day and months. Hyperlinks to choice artifact.
* **CSS** - Application sytling that looks good on different screen sizes, uses, good whitesspace, color choice and contrast.
* **JavaScript** - Provide login, choice display, calculating the total, display the graph, backend endpoint calls.
* **Service** - Backend service with endpoints for:
    - login
    - calculating total
    - drawing graph
    - straging the comsumption
* **DB/Login** - Store users, choices, and comsumption in database. Register and login users. Credentials securely stored in database. Cann't use this application unless authenticated.
* **WebSocket** -  If the family use this application, their comsumption are broadcast to all other family members.
* **React** - Application ported tu use the React web framework.



