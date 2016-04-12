$(function() {
	var meuLogin = "user@teste";
	var server = "http://livro-capitulo07.herokuapp.com";
	
	var $lastClicked;
	
	function onTarefaDeleteClick() {
		$(this).parent(".tarefa-item").off("click").hide("slow", function() {
			$(this).remove();
		});
	}
	
	function onTarefaItemClick() {
		if(!$(this).is($lastClicked)) {
			if($lastClicked !== undefined) {
				savePendingEdition($lastClicked);
			}
				
			$lastClicked = $(this);
				
			var text = $lastClicked.children(".tarefa-texto").text();
			
			var html = "<input type='text' " +
						"class='tarefa-edit' value='" + text + "'>";
						
			$(this).html(html);
			
			$(".tarefa-edit").keydown(onTarefaEditKeydown);
		}
	}
	
	function onTarefaKeyDown() {
		if(event.which ===13) {
			addTarefa($("#tarefa").val());
			$("#tarefa").val("");
		}
	}
	
	function onTarefaEditKeydown(event) {
		if(event.which === 13) {
			savePendingEdition($lastClicked);
			$lastClicked = undefined;
		}
	}
	
	function addTarefa(text) {
		var $tarefa = $("<div />")
						.addClass("tarefa-item")
						.append($("<div />")
								.addClass("tarefa-texto")
								.text(text))
						.append($("<div />")
								.addClass("tarefa-delete"))
						.append($("<div />")
								.addClass("clear"));
		
		$("#tarefa-list").append($tarefa);
		
		$(".tarefa-delete").click(onTarefaDeleteClick);
		
		$(".tarefa-item").click(onTarefaItemClick);
	}
	
	function savePendingEdition($tarefa) {
		var text = $tarefa.children(".tarefa-edit").val();
		
		$tarefa.empty();
		
		$tarefa.append("<div class='tarefa-texto'>" + text + "</div>")
				.append("<div class='tarefa-delete'></div>")
				.append("<div class='clear'></div>");


		$(".tarefa-delete").click(onTarefaDeleteClick);

		$tarefa.click(onTarefaItemClick);
	}
	
	function loadTarefas() {
		$.getJSON(server + "/tarefas", {usuario : meuLogin})
				.done(function(data) {
					console.log(data);
				});
	}
	
	$("#tarefa").keydown(onTarefaKeyDown);
	
	$(".tarefa-delete").click(onTarefaDeleteClick);
	
	$(".tarefa-item").click(onTarefaItemClick);
	
	loadTarefas();
}
);