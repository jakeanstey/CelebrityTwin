// -----JS CODE-----
// @input Asset.Texture[] images
// @input string[] names

var updateEvent = script.createEvent("UpdateEvent");
var turnOnEvent = script.createEvent("TurnOnEvent");
var turnOffEvent = script.createEvent("TurnOffEvent");
var browsRaisedEvent = script.createEvent("BrowsRaisedEvent");
var nextImageChangeTime;
var imageIndex = 0;
var image;
var running = true;
var label;
var username;

var update = function()
{
    if(script.images && script.images.length > 0 && getTime() >= nextImageChangeTime && running)
    {
        if(++imageIndex >= script.images.length)
        {
            imageIndex = 0;
        }
        setImage();
    }
}

var init = function()
{
    if(script.names && script.images && script.names.length == script.images.length)
    {
        running = true;
        image = script.getSceneObject().getComponent("Component.Image");
        label = script.getSceneObject().getChild(0).getComponent("Component.Text");
        global.userContextSystem.requestDisplayName(function(name)
        {
            username = name;
        });
        label.text = "";
        setImage()
    }
    else
    {
        running = false;
        print("You must name the celebrities!");
    }
}

function setImage()
{
    image.mainPass.baseTex = script.images[imageIndex];
    nextImageChangeTime = getTime() + 0.1;
}

var stopImages = function()
{
    running = false;
    label.text = username + " is " + script.names[imageIndex];
}

updateEvent.bind(update);
turnOnEvent.bind(init);
browsRaisedEvent.bind(stopImages);
turnOffEvent.bind(stopImages);