var jonesy_per_click = 1;
var jonesy_per_second = 0;
var total_jonesy = 0;
var save_names = getColumn("saves", "save_names");
var pickaxes_bought = 0;
var current_save = "default_save_name";
var pickaxe_urls = ["https://media.tenor.com/LPoSTCorc1sAAAAi/starbase-pickaxe.gif", "https://media.tenor.com/7fw1qgKb4MkAAAAi/netherite-pickaxe-minecraft.gif"];
//urls for various pictures for the main jonesy button
var jonesy_pic_urls = [
"https://gamepedia.cursecdn.com/fortnite_gamepedia/0/0f/NewJonesy.png?version=1d6b2c64d825d6940777abfa6dff344c",
"https://www.pngkit.com/png/full/115-1150708_avatar-png.png",
"https://clipground.com/images/fortnite-default-skin-png-8.png",
"https://gamepedia.cursecdn.com/fortnite_gamepedia/c/ca/Hero_Commando_Spitfire.png?version=7798df0cc3da49885c4c3f49928789a3",
"https://static.wikia.nocookie.net/fortnite_gamepedia/images/d/da/Support_specialist_uncommon_portrait.png/revision/latest?cb=20170730164523",
"https://static.wikia.nocookie.net/fortnite_gamepedia/images/f/f3/New_Headhunter.png/revision/latest?cb=20200106204203",
"https://static.wikia.nocookie.net/fortnite_gamepedia/images/e/ec/Banshee_Chapter_2.png/revision/latest/scale-to-width-down/256?cb=20200909144821",
];
//index for traversing the list when the button is clicked
var jonesy_pic_index = 0;
//formatting in the shop page
setStyle("pick_img1", ("transform:rotate(-90deg);"));
setStyle("pick_img2", ("transform:rotate(-90deg);"));
//the "home" screen isnt the first one so it has to be set at the beginning of the program
setScreen("home");
//stores all info about each item and also stores price and quantity
var items_info = {
  "item1":{"name":"Grey Pickaxe", "cps":0, "jpc":1, "price":25, "total":0,"item_adress":"item1", "item_description":"Grey Pickaxe (+1 JPC): $"},
  "item2":{"name":"Zombie Miner", "cps":1, "jpc":0, "price":50, "total":0, "item_adress":"item2", "item_description":"Zombie Miner (+1 JPS): $"},
  "item3":{"name":"Free Range Jonesy's", "cps":10, "jpc":0, "price":750, "total":0, "item_adress":"item3", "item_description":"Free Range Jonesy's (+10 JPS): $"},
  "item4":{"name":"Peely Farm", "cps":25, "jpc":0, "price":2500, "total":0, "item_adress":"item4", "item_description":"Peely Farm (+25 JPS): $"},
  "item5":{"name":"Green Pickaxe", "cps":0, "jpc":25, "price":50000, "total":0, "item_adress":"item5", "item_description":"Green Pickaxe (+25 JPC): $"},
  "item6":{"name":"Flush Factory", "cps":1000, "jpc":0, "price":250000, "total":0, "item_adress":"item6", "item_description":"Flush Factory (+1,000 JPS): $"},
  "item7":{"name":"Jonesy Bank", "cps":10000, "jpc":0, "price":10000000, "total":0, "item_adress":"item7", "item_description":"Jonesy Bank (+10,000 JPS): $"},
  "item8":{"name":"Tomato Town", "cps":50000, "jpc":0, "price":25000000, "total":0, "item_adress":"item8", "item_description":"Tomato Town (+50,000 JPS): $"},
  "item9":{"name":"Durrburger", "cps":250000, "jpc":0, "price":500000000, "total":0, "item_adress":"item9", "item_description":"Durrburger (+250,000 JPS): $"},
  "item10":{"name":"Purple Pickaxe", "cps":0, "jpc":250000, "price":100000000, "total":0, "item_adress":"item10", "item_description":"Purple Pickaxe (+250,000 JPC): $"},
  "item11":{"name":"V-Bucks Printer", "cps":10000000, "jpc":0, "price":1000000000, "total":0, "item_adress":"item11", "item_description":"V-Bucks Printer (10,000,000 JPS): $"},
  "item12":{"name":"Tilted Tax Accountant", "cps":75000000, "jpc":0, "price":5000000000, "total":0, "item_adress":"item12", "item_description":"Tilted Tax Accountant (+75,000,000 JPS): $"},
  "item13":{"name":"Gold Pickaxe", "cps":0, "jpc":50000000, "price":25000000000, "total":0, "item_adress":"item13", "item_description":"Gold Pickaxe (+50,000,000 JPC): $"},
  "item14":{"name":"Jonesy Storm", "cps":0, "jpc":0, "price":5000000000000, "total":0, "item_adress":"item14", "item_description":"Jonesy Storm (2x JPS multiplier): $", "jonesy_storm_owned":false}
};

//dictionary managing the placement and rotation of the pickaxes on screen
//prepopulated key:values are used for iteration and certain conditionals
var pickaxes = {
  "length_of_dict":0, "first_buy":true
  
};
//fleshes out the save data formating before populating it later
var save_data = {item_info:items_info, "jonesy_per_click":jonesy_per_click, "jonesy_per_second":jonesy_per_second, "total_jonesy":total_jonesy, "time_of_save":0};

//populates the dropdown for selecting a save with values stored code.orgs continous cloud storage
setProperty("save_name_dropdown", "options", save_names);

//changes the shop 1 screen to the shop2 screen when th corresponding button is pressed
onEvent("shop2_button", "click", function(){
  setScreen("shop2");
});
//vice versa of above
onEvent("shop1_button", "click", function() {
  setScreen("shop");
});

//goes from the home screen to the shop screen
onEvent("shop_button", "click", function(){
  setScreen("shop");
});

//back to the homepage from the second shop page
onEvent("back_button2", "click", function(){
  setScreen("game");
  //creates the images of the pickaxes around the "jonesy" button
  //because the create image function has to be called on the screen the images are being created on
  //new pickaxe coordinates are added when a specific item is bought
  render_pickaxes();
});
//back to the homepage from the first shop screen
onEvent("back_button", "click", function(){
  setScreen("game");
  render_pickaxes();
});

//increases the total amount of "jonesy" (money) when the large button is pressed
//amount increased is based on the tracked jonesy per click stat (JPC)
onEvent("jonesy_button", "click", function(){
  total_jonesy = total_jonesy+jonesy_per_click;
  //updates the main display of the amount of "jonesy" the user has
  setText("jonesy_output", total_jonesy+' Jonesy');
  //loops through the jonesy_pic_url list
  //goes back to the beginning of the list after the end has been reached
  if (jonesy_pic_index<jonesy_pic_urls.length-1){
    jonesy_pic_index++;
    setProperty("jonesy_button", "image", jonesy_pic_urls[jonesy_pic_index]);
  }
  else{
    jonesy_pic_index=0;
    setProperty("jonesy_button", "image", jonesy_pic_urls[jonesy_pic_index]);
  }
});
//calls the buy item function when the corresponding button is pressed
onEvent("item1_buy_button", "click", function(){
  buy_item(items_info.item1);
});
//adds a pickaxe to the pickaxe dictionary if the user has enough money for the item
//also updates the users total of the item
onEvent("item2_buy_button", "click", function(){
  if (buy_item(items_info.item2)==true){
    add_pickaxe();
  }
});
//next 11 on events do the same as the first one, just with different items 
onEvent("item3_buy_button", "click", function(){
  buy_item(items_info.item3);
});
onEvent("item4_buy_button", "click", function(){
  buy_item(items_info.item4);
});
onEvent("item5_buy_button", "click", function(){
  buy_item(items_info.item5);
});
onEvent("item6_buy_button", "click", function(){
  buy_item(items_info.item6);
});
onEvent("item7_buy_button", "click", function(){
  buy_item(items_info.item7);
});
onEvent("item8_buy_button", "click", function(){
  buy_item(items_info.item8);
});
onEvent("item9_buy_button", "click", function(){
  buy_item(items_info.item9);
});
onEvent("item10_buy_button", "click", function(){
  buy_item(items_info.item10);
});
onEvent("item11_buy_button", "click", function(){
  buy_item(items_info.item11);
});
onEvent("item12_buy_button", "click", function(){
  buy_item(items_info.item12);
});
onEvent("item13_buy_button", "click", function(){
  buy_item(items_info.item13);
});
onEvent("item14_buy_button", "click", function(){
  if (total_jonesy>=items_info.item14.price && items_info.item14.jonesy_storm_owned == false){
    items_info.item14.jonesy_storm_owned = true;
    jonesy_per_second=jonesy_per_second*2;
    jonesy_per_click = jonesy_per_click*2;
    setText("item14_info_label", "Jonesy Storm Bought");
    setProperty("item14_buy_button", "background-color", "grey");
    setText("jonesy_output", total_jonesy+" Jonesy");
    setText("total_money_label_shop", "$"+total_jonesy);
    setText("total_money_label_shop2", "$"+total_jonesy);
    setText("jps_label", jonesy_per_second + " JPS");
    setText("jpc_label", jonesy_per_click+" JPC");
    setText("item14_amount_owned_label", "1 owned");
  }
  else{prompt("not enough money/already owned")}
});

//calls the save function when the corresponding button is hit
//first passes the user inputted save name to the save function
//then it displays a popup to the user to confirm the game was saved
onEvent("save_button", "click", function(){
   prompt(save(prompt("name for the save")));
  
});
//calls the load save function and then waits 200 milliseconds
//because accessing the code.org cloud data takes time
onEvent("load_save_button", "click", function(){
  load_save();
  setTimeout(game, 200);
});
//starts the game function with the default starting values
onEvent("new_game_button", "click", function(){
  setScreen("game");
  game();
});

//updates the "jonesy" once every second based on the items owned
function game(){
  setInterval(update_money, 1000);
  setInterval(function(){
    save(current_save);
    showElement("auto_save_label");
    setTimeout(function(){hideElement("auto_save_label")},5000);
  },60000);
}

//loads the appropiate save based on the selected drop down element
function load_save(){
  current_save = getText("save_name_dropdown");
  //QUICK library (credit:ismailmf777, https://forum.code.org/t/how-to-quickly-store-objects-in-databases/37178)
  //is used to store the save_data object in code.orgs cloud key:value pair storage
      QUICK.getKey(getText("save_name_dropdown"),function(save){
        //sets necessary game values to the ones stored in the "save" object
        items_info = save.item_info;
        jonesy_per_click = save.jonesy_per_click;
        total_jonesy = save.total_jonesy;
        jonesy_per_second = save.jonesy_per_second;
        //using time from epoch in milliseconds 
        //the total amount of "jonesy" made while away from the game is calculated
        var afk_jonesy = Math.round(((getTime()-save.time_of_save)/1000)*save.jonesy_per_second);
        //displays a popup showing the user how much was made while away from the game
        prompt("You made "+ afk_jonesy+" jonesy while gone");
        //adds the amount made while away to the total
        total_jonesy = total_jonesy+afk_jonesy;
      });
  //allows time for the QUICK.getKey function and callback to finish
  //before calling a function that updates all display values in the app
  setTimeout(update_screen_after_save_load,300);
  //changes the screen to the game screen
  setScreen("game");
  //populates pickaxe list when loading the game
  setTimeout(populate_pickaxes_on_load,300);
  //makes the pickaxe GIFs on the game screen based on stored values
  setTimeout(render_pickaxes,300);
}

function populate_pickaxes_on_load(){
  for (var i = 0; i < items_info.item2.total; i++){
    add_pickaxe();
    jonesy_per_second++;
  }
  jonesy_per_second-i;
}

//saves all of the necessary data in a key value pair using the QUICK library
//credit: ismailmf777, https://forum.code.org/t/how-to-quickly-store-objects-in-databases/37178
function save(save_name){
  //changing values in the prestructured save object to the current ones
  save_data.item_info = items_info;
  save_data.jonesy_per_click = jonesy_per_click;
  save_data.jonesy_per_second = jonesy_per_second;
  save_data.total_jonesy = total_jonesy;
  //stores time from epoch for calculating the amount of afk (away from keyboard) "jonesy" made
  save_data.time_of_save = getTime();
  //times fo values to populate vefore storing the save_data object using the QUICK library
  setTimeout(function(){QUICK.setKey(save_name, save_data)}, 50);
  //checks if the user inputted save name has been used before to determine return string
  for (var name in save_names){
    if(save_names[name] == save_name){
      return "Save Overwritten!";
    }
    //if at the end of the list it adds the name of the save to 
    //code.orgs continous value storage and returns appropiate message
    else if(name == save_names.length-1){
      createRecord("saves", {save_names:save_name}, function() {
      });
      return "Game Saved!";
    }
  }
}

//the function called earier that updates all information labels with the appropiate information from the save
function update_screen_after_save_load(){
  setProperty("jonesy_output", "text", total_jonesy+" Jonesy");
  setProperty("jpc_label", "text", jonesy_per_click + " JPC");
  setProperty("jps_label", "text", jonesy_per_second+ " JPS");
  //loops through the labels and buttons for all items using a sequential naming scheme
  //to update all labels with the new values from the loaded save object
  for (var item in items_info){
    setProperty(item+"_info_label", "text", items_info[item].item_description + items_info[item].price);
    setProperty(item+"_amount_owned_label", "text", items_info[item].total+ " owned");
  }
  if (items_info.item14.jonesy_storm_owned == true){
    setText("item14_info_label", "Jonesy Storm Bought");
    setProperty("item14_buy_button", "background-color", "grey");
    setText("item14_amount_owned_label", "1 owned");
  }
}

//takes in an object from the items_info table
//and checks if the user has enough "joneesy"
//while mostly uneeded the function will return true when an item is successfully bough
//for synergy with the add_pickaxe function
function buy_item(item){
  if (total_jonesy<item.price){
    prompt("not enough jonesy for a "+item.name);
  }
  else{
    total_jonesy = total_jonesy - item.price;
    setText("total_money_label_shop", "$"+total_jonesy);
    setText("total_money_label_shop2", "$"+total_jonesy);
    item.total++;
    item.price = Math.round((item.price*1.07));
    setProperty(item.item_adress + "_info_label", "text", item.item_description+item.price);
    setProperty(item.item_adress+"_amount_owned_label", "text", item.total+ " owned");
    items_info[item.item_adress] = item;
    if (items_info.item14.jonesy_storm_owned == false){
      jonesy_per_second = jonesy_per_second+item.cps;
      jonesy_per_click = jonesy_per_click + item.jpc;
    }
    else{
      jonesy_per_second = jonesy_per_second+(item.cps*2);
      jonesy_per_click = jonesy_per_click + (item.jpc*2);
    }
    setText("jps_label", jonesy_per_second+" JPS");
    setText('jpc_label', jonesy_per_click + " JPC");
    return true;
  }
}

//updates the total_jonesy variable based on cps
//updates label that diplay the total jonesy value
function update_money(){
  total_jonesy = total_jonesy+jonesy_per_second;
  
  setText("jonesy_output", total_jonesy + " Jonesy");
  setText("total_money_label_shop", "$"+total_jonesy);
  setText("total_money_label_shop2", "$"+total_jonesy);
}
//makes a new randomly placed pickaxe object 
//chooses the postion based on if the jonesy per second is divisble by 2
//the pickaxes are also assigned rotation values depending on poition to enhance visual effect
function add_pickaxe(){
  if(jonesy_per_second%2==0){
    //the pickaxe GIF elements are assigned an id based on the amount of them in the dictionary
    //allows easy manipulation of the elements also
    pickaxes[(pickaxes.length_of_dict).toString()] = {"x_position":randomNumber(0,50), "y_position":randomNumber(175,330), "rotation":0};
  }
  else{
    pickaxes[(pickaxes.length_of_dict).toString()] = {"x_position":randomNumber(245,290), "y_position":randomNumber(175,330), "rotation":180};
  }
  //increses the dictionary length value in the pickaxes dictionary
  pickaxes.length_of_dict++;
  //increases the pickaxe bought counter
  //which tracks the amount of pickaxes bought before rendering 
  pickaxes_bought++;
}

//displays the amount of pickaxe gifs needed
//made to vaguely resemble the cursor in cookie clicker 
function render_pickaxes(){
    //deletes previously rendered pickaxes before replacing them if more pickaxe inducing items have been bough
   if(pickaxes.first_buy==false){
    for (var i = 0; i<pickaxes.length_of_dict-pickaxes_bought;i++){
        deleteElement(i.toString());
      }
    }
    //resets pickaxe bought counter to prepare for rendering after more have been bough
    pickaxes_bought = 0;
    //displays all the pickaxes in pickaxe object
    //picks from two random pickaxe animations two display 
    for (var pickaxe=0; pickaxe<pickaxes.length_of_dict;pickaxe++){
      var image_id = pickaxe.toString();
      if (items_info.item14.jonesy_storm_owned == false){
        image(image_id, pickaxe_urls[randomNumber(0,1)]);
        setPosition(image_id, pickaxes[pickaxe].x_position, pickaxes[pickaxe].y_position, 30,30);
        setStyle(image_id, ("transform:rotate("+pickaxes[pickaxe].rotation+"deg);"));
      }
      else{
        image(image_id, "https://custom-doodle.com/wp-content/uploads/doodle/fortnite-jonesy-the-first-take-the-l-dance/fortnite-jonesy-the-first-take-the-l-dance-doodle.gif");
        setPosition(image_id, pickaxes[pickaxe].x_position, pickaxes[pickaxe].y_position, 60,60);
      }
    }
  //changes the first_buy value to false if a pickaxe has been bought
  if(pickaxes.length_of_dict>0){
    pickaxes.first_buy = false;
  }
}
