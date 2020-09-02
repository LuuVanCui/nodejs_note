$(function() {
    var createNoteForm = document.forms['create-note-form'];
    var editNoteForm = document.forms['edit-note-form'];
    var displayNoteForm = document.forms['display-note-form'];
    var newNoteBtn = $('.new-note-btn');
    var updateNoteBtn = $('.update-btn');
    var deleteNoteBtn = $('.delete-btn');
    var noteId;

    // When click notes
    $('.notes').click(function() {
      noteId = $(this).data('id');
      var title = $(this).children().first().text();
      var description = $(this).children().last().text();
      $('.txt-title').val(title);
      $('.txt-description').val(description);

      // remove all css
      $('.notes').removeClass('highLightedItem');
      // add effect
      $(this).addClass('highLightedItem');

      history.pushState({}, "", "/" + noteId);
    });
    
    // when click icon new note
    newNoteBtn.click(function() {
      createNoteForm.action = '/notes/store';
      createNoteForm.submit();
    });

    // when click Update 
    $('.note-detail-form').on('submit', function(event) {
      event.preventDefault();

      let title = $('.txt-title').val();
      let description = $('.txt-description').val();

      $.ajax({
        url: '/notes/' + noteId,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ title, description }),
        success: function(response) {
          console.log(response);
        }
      });
    });
  });