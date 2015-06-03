//Globals
var parseDBID = -1;
var omletID;

$(document).ready(function(){
    //Initialization call to parse
    Parse.initialize("QkXw7fBPJI2f3DpSlP17JaLwjct7mSlAglW921ZD", "Sgpsbwn4Ad8OGmKbZ1wgfMXo0TEtQlaaCCdmFoWX");
    //Get Omlet ID (placeholder for now)
    omletID = 'khan';
    $("#start_button").click(function () {
        newParseDatabase();
    });
});

function newParseDatabase() {
    var OmletDocument = Parse.Object.extend("OmletDocument");
    var omletDocument = new OmletDocument();
    
    omletDocument.save(null, {
        success: function(omletDocument) {
            parseDBID = omletDocument.id;
            populateParseDatabase();
        },
        error: function(omletDocument, error) {
            alert("Error Creating new Database!");
        }
    });
}

function populateParseDatabase() {
    var OmletDocument = Parse.Object.extend("OmletDocument");
    var query = new Parse.Query(OmletDocument);
    query.get(parseDBID, {
        success: function(OmletDocument) {
            omletDocument.set("_group_location", {"present": false, "start_time": 0, "share_time": 0, "lat": 0, "lng": 0, "address_string": ""});
            omletDocument.set("_users", []);
            omletDocument.save(null, {
                success: function(omletDocument) {
                    changePage();
                },
                error: function(omletDocument, error) {
                    alert("Error Populating new Database!");
                }
            });
        },
        error: function(OmletDocument, error) {
            alert("Error Retrieving Database!");
        }
    });
}

function deleteParseDatabase() {
    var OmletDocument = Parse.Object.extend("OmletDocument");
    var query = new Parse.Query(OmletDocument);
    query.get(parseDBID, {
        success: function(OmletDocument) {
            OmletDocument.destroy({
                success: function(myObject) {
                    parseDBID = -1;
                    revertPage();
                },
                error: function(myObject, error) {
                    alert("Error Destroying Database!");
                }
            });
        },
        error: function(OmletDocument, error) {
            alert("Error Retrieving Database!");
        }
    });
}

function changePage() {
    $("#start_button").addClass("disabled");
    $("#stop_button").removeClass("disabled");
    $("#share_button").removeClass("disabled");
    $("#omletIDText").append(omletID);
    $("#parseIDText"). append(parseDBID);
    $("#URLText").append('<a href="http://web.stanford.edu/~khan18/Pinpoint/?parseDB='+parseDBID+'&omletID='+omletID+'">http://web.stanford.edu/~khan18/Pinpoint/?parseDB='+parseDBID+'&omletID='+omletID+'</a>')
    $("#info_display").removeClass("hidden");
    $("#stop_button").click(function () {
        var r = confirm("Are you sure you want to delete the Parse Database? All users currently sharing their location in this instance will be affected!");
        if(r) {
           deleteParseDatabase(); 
        }
    });
    $("#share_button").click(function () {
        shareLink();
    });
}

function revertPage() {
    $("#start_button").removeClass("disabled");
    $("#stop_button").addClass("disabled");
    $("#share_button").addClass("disabled");
    $("#info_display").addClass("hidden");
}

function shareLink() {
    alert('Link is  http://web.stanford.edu/~khan18/Pinpoint/?parseDB='+parseDBID+'&omletID='+omletID);
}