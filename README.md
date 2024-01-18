# Financial Ledger

## Specification Deliverable

### Elevator pitch

Do you recall your monthly spending? Numerous individuals struggle to monitor their expenses, leading them to exceed their budgeted amounts. To address this issue, our financial ledger application aids users in tracking their expenditures and calculating their overall spending. Users can create personalized financial ledgers to input both their expenses and income. Subsequently, the application generates a graphical representation of their total spending.
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



