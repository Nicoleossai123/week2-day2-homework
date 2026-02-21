$(document).ready(function () {


  var selectedActivities = [];

 
  $(document).on("click", ".selectable", function () {
    var $cell = $(this);
    var activityRow  = $cell.closest("tr").find(".activity-label").text().trim();
    var cliffCol     = $("#activitiesTable thead tr:nth-child(2) th").eq($cell.index()).text().trim();
    var activityText = activityRow + " at " + cliffCol + ": " + $cell.text().trim();

    if ($cell.hasClass("selected")) {
     
      $cell.removeClass("selected");
      selectedActivities = selectedActivities.filter(function (item) {
        return item !== activityText;
      });
    } else {
    
      $cell.addClass("selected");
      selectedActivities.push(activityText);
    }

    updateModal();

   
    if (selectedActivities.length > 0) {
      $("#activityModal").modal("show");
    } else {
      $("#activityModal").modal("hide");
    }
  });

 
  function updateModal() {
    var $list = $("#modalActivityList");
    $list.empty();
    if (selectedActivities.length === 0) {
      $list.append("<p class='text-muted'>No activities selected.</p>");
    } else {
      $.each(selectedActivities, function (i, item) {
        $list.append("<p class='modal-activity-item mb-1'>" + item + "</p>");
      });
    }
  }

 
  $("#btnBackToActivities").on("click", function () {
    $("#activityModal").modal("hide");
  });

 
  $("#activityModal").on("show.bs.modal", function () {
    updateModal();
  });

  
  $("#btnGetInfo").on("click", function () {
    var email = $("#modalEmail").val().trim();
    if (email === "") {
      alert("Please enter your email address.");
      return;
    }
    alert("Info request sent to: " + email + "\n\nSelected activities:\n" + selectedActivities.join("\n"));
    $("#activityModal").modal("hide");
  });

});