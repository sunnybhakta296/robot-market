# Robot Market

This is an e-commerce site for you to buy robots. The homepage should display a list of robots for people to browse,
where on the right side of the screen should display a cart that show a list of selected robots.

### Item Listing
![image](https://user-images.githubusercontent.com/77013204/150834123-a1839354-4985-4d19-b025-719d3a6c1d25.png)

### Item With Filter
![image](https://user-images.githubusercontent.com/77013204/150833309-e4e8628a-0eca-464a-bb71-cfe33f3aef9c.png)

### Cart feature
![image](https://user-images.githubusercontent.com/77013204/150834007-7f7642f8-426c-4c5e-b5b3-43989dbc920d.png)

![image](https://user-images.githubusercontent.com/77013204/150834059-e4911a8b-8b1a-4f07-a203-c22d8c885246.png)

### Alert
![image](https://user-images.githubusercontent.com/77013204/150834280-f8adfb1b-7710-4397-a30f-76482f7c9f7e.png)

![image](https://user-images.githubusercontent.com/77013204/150834368-ddf006cc-40a3-4d2b-917e-7d70a393ffb9.png)



**Please read the instructions and FAQ below before begin.**

## Contact Details
Please fill in your name and email
- Name: ____
- Email: ____

## Features

- products should display in a grid.
- each robot should show image, name, price, stock, created date, material, and button to add to cart
    - created date should display in `DD-MM-YYYY` format
    - when robot is out of stock add to cart button should be disabled
    - price should be displayed in Thai Baht formatted, `฿5,300.00`
- give the user option to filter by a robot's material type.
- user can add up to 5 different robots to cart, but they can select as much as they want in the same type until it runs
  out of stock.
    - if user try to add more that 5 different robots then it should show an alert
- cart should display on the right side of the screen.
    - cart should contain list of selected robots, total amount and total price
    - user can increase or decrease the number of robots inside of cart section
    - total amount should be the total number of selected robots
    - total price should be in Thai Baht formatted, `฿5,300.00`

## Robots API

**DO NOT CHANGE API RESPONSE INSIDE SERVER FOLDER**

- The basic query looks like this: `/api/robots`
- The response format is JSON
```
{
  name
  image
  price
  stock
  createdAt
  material
}
```

## FAQs

### How do I start the app?

At the very beginning please fork or clone this repository into your own private repository (github / bitbucket).
During all development please make regular commits while working on this app.

Start both server and frontend project by using `npm start` command. The port for frontend is `localhost:3000`, and for
server is `localhost:8000`

### What libraries/frameworks, packages, tools can I use?

The project frontend is in React.js (you can select between js or ts), but other than that you are free to use whatever
libraries/frameworks, packages, tools that you want.

### What should I do when I'm finished?

After you have finished you work push all commits to your repository, and then send us email to inform that app has been finished, also please add following users there:
* win@morphos.is
* suhas@morphos.is

### How is the exam graded?

We are looking for idiomatic use of JavaScript, and the ability to solve the problem with code that is clean and easy to
read. Please show us how you would use the language and conventions to structure things in a clear and maintainable way.

Even though we are not giving you the UI design, we believe that as a Frontend Developer you should have some ideas of
how it should look. You are free to use any styling tools that you want, SASS, css-in-js, or even styled-components.
