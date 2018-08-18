$(function() {
  $(".change-devour").on("click", function(event) {
    let id = $(this).data("id");
    let newBurger = $(this).data("newdevour");

    let newBurgerState = {
      devour: newBurger
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newBurgerState
    }).then(function() {
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    let newBurger = {
      name: $("#ca")
        .val()
        .trim(),
      devoured: $("[name=devoured]:checked")
        .val()
        .trim()
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      location.reload();
    });
  });

  $(".devour-burger").on("click", function(event) {
    let id = $(this).data("id");

    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("devour-burger", id);

      location.reload();
    });
  });
});
