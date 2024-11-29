$(function() {

  let userId = 1

  $(".container header").children().eq(0).click(function() { 
    if (userId === 1) {
      userId = 30
    } else {
      userId -= 1
    }
    getUser(userId)
  })

  $(".container header").children().eq(1).click(function() {
    if (userId === 30) {
      userId = 1
    } else {
      userId += 1
    }
    getUser(userId)
  })

  function getUser(id) {
    $.ajax({
      url: `https://dummyjson.com/users/${encodeURIComponent(id)}`,
      type: "GET",
      success: function(res) {

        $(".info").find(".info__image img").attr("src", res.image)
        $(".info").find(".info__content").html(
          `<h1>${res.firstName} ${res.lastName}</h1>
          <p><strong>Age</strong>: ${res.age}</p>
          <p><strong>Email</strong>: ${res.email}</p>
          <p><strong>Phone</strong>: ${res.phone}</p>`
        )
        $(".posts h3").html(`${res.firstName}'s Posts`)
        $(".todos h3").html(`${res.firstName}'s To Dos`)
      },
      error: function(err) {
        console.error(err)
      }
    })

    $.ajax({
      url: `https://dummyjson.com/users/${encodeURIComponent(id)}/posts`,
      type: "GET",
      success: function(resPosts) {

        $(".posts ul").empty()

        if (resPosts.posts.length === 0) {
          $(".posts ul").html("<li><p>User has no posts</p></li>")
        } else {
          $.each(resPosts.posts, function(index, post) {
            $(".posts ul").append(`<li>
              <h4>${post.title}</h4>
              <p>${post.body}</p>
              <p class="views_hidden">${post.views}</p>
              </li>`)

            $(".posts ul h4").click(function() {
              $(".overlay").remove()
              $("body").append(`<div class="overlay">
                  <div class="modal">
                  <h2>${$(this).text()}</h2>
                  <p>${$(this).next().text()}</p>
                  <p><i>Views</i>: ${$(this).siblings(":last").text()}</p>
                  <button>Close Modal</button>
                  </div>
                </div>`)
                $(".modal button").click(function() {
                  $(".overlay").remove()
                })
            })
          })
          $(document).click(function(e) {
            if(!$(e.target).closest(".modal").length && !$(e.target).is(".modal button")) {
              $(".overlay").remove()
            }
          })

          $(".posts ul h4").click(function(e) {
            e.stopPropagation();
          });
        }
      },
      error: function(errPosts) {
        console.error(errPosts)
      }
    })

    $.ajax({
      url: `https://dummyjson.com/users/${encodeURIComponent(id)}/todos`,
      type: "GET",
      success: function(resTodos) {

        $(".todos ul").empty()

        if (resTodos.todos.length === 0) {
          $(".todos ul").html("<li><p>User has no todos</p></li>")
        } else {
          $.each(resTodos.todos, function(index, value) {
            $(".todos ul").append(`<li>
              <p>${value.todo}</p>
              </li>`)
          })
        }
      },
      error: function(errTodos) {
        console.error(errTodos)
      }
    })
  }

  $(".posts h3").click(function() {
    $(this).next().slideToggle()
  })

  $(".todos h3").click(function() {
    $(this).next().slideToggle()
  })

  getUser(userId)

})