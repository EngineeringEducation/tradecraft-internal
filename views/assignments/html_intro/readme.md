# HTML

### Section 0 - In Which We Introduce Tags  
You have probably run into HTML before if you've ever used the INTERNET. You've seen paragraph tags - `<p>`, or you've run into `<span>` or `<div>`. You've probably used  
```
<a href="http://theprofoundprogrammer.com/post/29546648842/text-xml-photograph-of-a-series-of-needlessly">Click here</a>
```  
before to link to something. Let's talk about how this works.  
  
  
Think of tags (anything that starts with < and ends with >) as _boxes_. The words in between the angle braces (> & <) are like labels to tell you what the box contains.  
### Section 1 - In Which We Make Our First Page

All of the HTML for a page is contained within a box called, you guessed it, `<html>`. The `html` tag needs to have a start and end, called "opening" and "closing" tag. Most other tags also have an open and close. The set of tags that go directly inside the HTML tag are the `<head>` and `<body>` tags. All together, it looks like this

```
<html>
    <head>
    </head>
	<body>
	</body>
</html>
```

This is what's known as a page. Usually though, your page will have more HTML than we just saw, so here's something that's a more complete page. You can use this as a template:

```
<html>
	<head>
		<title>
			My page
		</title>
	</head>
	<body>
		<h1>
			This is a header - the biggest one
		</h1>
		<p> 
			This is a paragraph
		</p>
		<ul>
			<li>This is a list item</li>
			<li>And here is another</li>
			<li>Fish</li>
		</ul>
	</body>
</html>
```

It might take awhile to get used to reading a document like that - let's point some things out.  
First, we're using 4 spaces to indent, and we indent every time we open something. This is a best practice that helps you read the HTML. It's _very important_ that you keep to this convention, it's designed to help you keep track of where everything is.

Above, each kind of content is kept in a separate tag. We do this so that we can manipulate and change each item separately. Copy-paste the above example into a file, save it as `demo.html`, then open it in Google Chrome.

Opening it, you should get something like this : 

![Awesome 90's page](https://raw.github.com/lizTheDeveloper/HTML_Hackbright/master/ex01/awesome_90s.png "awesome 90's page")

Alright, so that's pretty much all the HTML you'd need to know. If you were content to stay in 1990. 


Let's get stylin'.

---
### Section 2 - In Which We Add Cats

You'll notice that we put some text on the page, but nowhere did we say "use Times New Roman", or "list items should have little black circles next to them". These are the browsers default styles. Terrible, ugly default styles. Let's try a little harder.

Let's start with some kittens.   
Add an image tag, probably under the paragraph - `<img>` and let's give it a `src` attribute. We give "attributes" to HTML tags like this:
```
<img src="http://placekitten.com/500/500">
``` 
which tells the browser that we need to reserve space for an image, and then where it can find that image. Our image will be added to the page wherever you've placed it - you'll notice the elements are vertically stacked in the page, one on top of the other, in the order they've been put in the HTML. 

We can however, align things differently, as well as change all of the default styles the browser applies to our text.

___
### Section 3 - In Which The Cats Develop Style
Go to the `<head>` section of the page, we're going to tell the browser some rules to apply to the text and layout of the page. Open a new tag within `<head>` - call it `<style>`. 

What we put between the opening `<style>` and the closing `</style>` tags is called CSS. Usually this ends up in a different file, but we'll get to that later. First, we're going to pick a _selector_ to apply a _style_ to. It looks something like this:

```
selector {
	rule: value;
	rule: value;
}
```

We're going to add a rule to the `h1` tag, which will apply to _all_ `h1`s. Check it:

```
h1 {
	font-family: arial;
}
```
Let's go ahead and add that rule to our `<style>` tag (indent once), and reload the page. 
Looks much better, right?

Probably want to add some other styles, like color. Colors in CSS are expressed in several ways, either by using a hex RGB value - `#ff00ff`, or like this - `rgba(200,200,200,0.5)`. The "a" in "rgba" refers to _alpha_, which is nerd for "transparency". 
```
h1 {
    font-family: arial;
    color: #000088;
    background-color: rgba(200,255,200,0.5);
}
```

Our page is now much nicer, and you know how to style things. 

### Section 4 - In Which We Identify Cats

I mentioned before that you could align things differently, not just vertically. Let's talk about how that happens. 

Let's get this out of the way first - there clearly aren't enough cats on the page. Obviously, we need to add more cats. 

Add 2 more cats to the page, but give them different sizes by changing the numbers on the end of the URL. 

Next, we'll stack the cats horizontally, but first we need a way to refer to the cats individually. Our cats need their own names.


Add an `id` element to each cat. 
```
<img src="http://placekitten.com/300/300" id="ms_von_cuten">
<p>Ms Von Cuten</p>
<img src="http://placekitten.com/200/400" id="mr_snuggles">
<p>Mister Snuggles </p>
<img src="http://placekitten.com/300/500" id="professor_buttonsworth">
<p>Professor Buttonsworth</p>
```

Now we can refer to our cats individually within our style tag. The way we do this is to use a `#`.

```
#mr_snuggles {
    border: solid blue 10px
}
```

You'll notice one of the cats now has an awesome blue border! This is great. Now we know which one is which (we knew who ms von cuten was because it was obvious but the other two were hard to tell).  

### Section 5 - In Which We Try To Make Things Look Nice
Alright, so we've got some cats - let's try to line them up. Unfortunately, cats (and most other things) don't line up real easily. So, we're going to have to pull a schroödinger and put these cats in some boxes. 

Put your cat and the corresponding label for the cat into a useful, multi-purpose box called a `div`. (Don't forget the tabs)
```
<div>
    <img src="http://placekitten.com/300/300" id="ms_von_cuten">
    <p>Ms Von Cuten</p>
</div>
```
Do this for each cat, and don't forget to close the box (or the cat will get out).

Now that we've got the cats in boxes, we're going to line up the boxes. But rather than adding a name to each box, why don't we just line up all of the boxes in the same way? To do this, we're going to add a _class_ to the boxes.

```
<div class="catbox">
    <img src="http://placekitten.com/300/300" id="ms_von_cuten">
    <p>Ms Von Cuten</p>
</div>
```

And now we can refer to all of the boxes at once, and line them all up.

```
.catbox {
    float:left;
}
```

OH MY GOD look at those cats. All in their own little box, all lined up. Beautiful.  
Unfortunately, cats don't like to be all crushed up against each other- let's give them some room, shall we?

```
.catbox {
    float:left;
    padding: 10px 10px 10px 10px;
}
```

Great. Here's what my page ended up looking like, so you can compare.
```
<html>
    <head>
        <title>
            My page
        </title>
        <style>
            h1 {
                font-family: arial;
                color: #000088;
                background-color: rgba(200,255,200,0.5);
            }
            #mr_snuggles {
                border: solid blue 10px;
            }
            .catbox {
                float:left;
                padding: 10px 10px 10px 10px;
            }
        </style>
    </head>
    <body>
        <h1>
            This is a header - the biggest one
        </h1>
        <p> 
            This is a paragraph
        </p>
        <ul>
            <li>This is a list item</li>
            <li>And here is another</li>
            <li>Fish</li>
        </ul>
        <div class="catbox">
            <img src="http://placekitten.com/300/300" id="ms_von_cuten">
            <p>Ms Von Cuten</p>
        </div>
        <div class="catbox">
            <img src="http://placekitten.com/200/400" id="mr_snuggles">
            <p>Mister Snuggles </p>
        </div>
        <div class="catbox">
            <img src="http://placekitten.com/300/500" id="professor_buttonsworth">
            <p>Professor Buttonsworth</p>
        </div>
    </body>
</html>
```
![example](https://raw.github.com/lizTheDeveloper/HTML_Hackbright/master/ex01/cats.png)
### Section 6 - In Which We Lose Our Step-By-Step Directions
So. Now that you know how to ~~take care of cats~~ use HTML, I want you to make an AWESOME PROFILE PAGE. 

It should look like this:

![Liz's profile](https://raw.github.com/lizTheDeveloper/HTML_Hackbright/master/ex01/awesome_profile.png "Best profile page ever")

You might be wondering, how the hell do I do that? It goes something like this:


1. Find an awesome space background somewhere. Save it to the same folder your exercise goes in.
2. Get yourself an [embeddable widget on twitter](https://dev.twitter.com/docs/embedded-timelines). Embed the widget.
3. [Set the background](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) of your `body` tag to point to your awesome space background.
3. Create some boxes for your content to go in (divs). Put the content in the boxes.
4. Give the boxes a class. 
5. Tell the classes to line up next to each other (float: left;).
6. Some of your boxes need to be stacked - maybe they should go in a bigger box?
7. Tell some of your boxes that their backgrounds need to be less boring (background-color:rgba(r,g,b,a);)
Continue to consult the documentation on how [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) and [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) work.

One thing I didn't discuss was the contact form on the right.

### Section 7 - In Which We Care About Feedback From Others For Some Reason

Forms are great. They're what let us collect information from the user. Take a look at this example:
```
<form action="/some_webpage" method="GET">
    Name: <input type="text" name="user_name">
    Email: <input type="text" name="user_email">
    Hometown: <input type="text" name="user_hometown">
    Do you like bunnies?: Yes <input type="radio" name="user_bunny_preference" value="yes"> No<input type="radio" name="user_bunny_preference" value="no">
</form>
```
This form will send the information collected to a webserver, as marked in it's "action" property. Take a spin through [this basic forms tutorial](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form?redirectlocale=en-US&redirectslug=HTML%2FForms%2FMy_first_HTML_form), if you feel you need help. Make sure to add a contact form to your portfolio page, and then you're done.