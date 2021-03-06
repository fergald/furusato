# NooOoOoOo!!1

This whole thing is a waste of time!
The printed output for the tax return
doesn't contain any of the information you enter.
All those dates, kens and machis are just thrown away.
The only thing that matters is the total.
Fuuuuuuuuuuuuuuuu...!

# What?

This is a hack for the furusato nozei entry page
of the Japanese tax entry form
(the version that produces a PDF to print out,
I have no idea about the e-tax thing).

# Why?

That form is very frustrating.
It's all drop-downs.
I have all of my data already in digital form.
Drop-downs mean I can't copy and paste.
If you did furusato to a town in Hokkaido
good luck finding the town from the list of ~100.

Also the date entry is particularly special.
The year is fixed,
it can only be 2019
but in the Japanese calendar,
2019 from Jan-Apr is 平成31
and from May-Dec is 令和1.
So before you can select a month,
you must select an era.
Once the era is chosen,
the year is fixed
(but there's still a drop-down for it for added confusion)
then you can select a month
(1-4 or 5-12, depending on the era).
I can't think of a worse way of having a human input a date.

# Setup

*WARNING* Never paste random JS from untrusted sites
into your JS console.
I repeat,
*DO NOT FOLLOW THESE INSTRUCTIONS IF YOU DO NOT UNDERSTAND THE DANGERS*.

If you do decide to do this,
don't blame me if you lose all your work.
This code worked for me
it may not work for you.
It might do something much worse for you!

When you get the furusato form open in your browser
(I'm assuming chrome),
hit CTRL-i to open the debug tools.
Copy the JS from [here](https://raw.githubusercontent.com/fergald/furusato/master/furusato.js)
and paste it into the JS console.

You're done.

# Using

You'll see some input fields have appeared
at the top of the form.
You have 2 choices.

## CSV

The CSV field lets you paste in 1 comma-separated entry.
It expects `YYYY-MM-DD,Prefecture,Town (optional),Amount`.
E.g. `2019-12-27,佐賀県,上峰町,35000`.
When you move out of the field,
it populates the fields below
and (hopefully) sets all of the drop-downs correctly.
All you have to do is click the button at the bottom of the page.

## Non-CSV

If you don't have your data in CSV
you can just type things into the individual fields
and click "go".

## Keyboard short-cut

If you press `c` on your keyboard
focus moves to the CSV field.
If you needed to actually press the letter c,
I'm sorry.
You can paste `windows.onkeypress = undefined` into the JS console.

## Errors

At the moment if there are any errors,
e.g. a date that can't be parsed
or it can't find the town you entered,
you get a message in red below the input boxes
and it throws an exception
which you can see on the JS console.

# Future

Feel free to do whatever you want this.
Hopefully it works with next year's form
with minor modifications.

I might turn this in a chrome extension
however I think the idea of an extension
that has access to the tax site is pretty shady,
so I don't know.
