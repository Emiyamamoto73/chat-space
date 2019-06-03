$(function() {
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">"${user.name}"</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
     
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  .done(function(user) {
    $("#user-search-result").empty();
    if (user.length !== 0) {
      user.forEach(function(user){
        var html = appendUser(user);
        $("#user-search-result").append(html);
      });
    }
    else {
      $("#user-search-result").append("一致するユーザーはありません");
    }
    })
  .fail(function() {
    alert('検索に失敗しました');
  })
})

});

