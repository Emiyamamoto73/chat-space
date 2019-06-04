var member_list = $("#chat-group-users");
$(function() {
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    return html;
  }

  function appendDelete(userName, userId){
    var html = `<div id="chat-group-user"><div class="chat-group-user clearfix js-chat-member" id='${userId}'>
              <input name="group[user_ids][]" type="hidden" value='${userId}'>
              <p class="chat-group-user__name">${userName}</p>
              <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
              </div>
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

  $(document).on("click", ".user-search-add", function() {
    var userName = $(this).data("user-name");
    var userId = $(this).data("user-id");
    $(this).parent().remove();
      var html = appendDelete(userName, userId);
      $("#chat-group-users").append(html);
  });

  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  })
});
