$(function() {

	// Adiciono o primeiro bloc assim que a pagina carrega
	$('.editor-canvas').append(getBlockHtml());


	// $('.modal').modal();
	// $('.editor-canvas').sortable();

	var $currentText = null;
	var currentAction = {type: null, element: null};

	// $('select').formSelect();

	$('.editor-tools ul').not('.current').hide();

	$('.editor-canvas').on('click', '.editor-block, .editor-row, .editor-col', function(e) {
		var $this = $(this);

		currentAction.element = $this;

		$('.editor-canvas div').removeClass('editor-mouseover');
		$this.addClass('editor-mouseover');

		var currentClass = '';
		if ($this.hasClass('editor-block')) {
			currentClass = 'block';
		} else if($this.hasClass('editor-row')) {
			currentClass = 'row';
		} else if($this.hasClass('editor-col')) {
			currentClass = 'col';
		}

		$('.editor-tools ul.current').fadeOut('fast', function() {
			$(this).removeClass('current');
			$('.editor-tools ul.editor-tools-' + currentClass).fadeIn('fast', function() {
				$(this).addClass('current');
			});
		});

		e.stopPropagation();
	});

	// $('.editor-canvas').on('mouseenter', '.editor-block', function(e) {
	// 	$(this).addClass('editor-mouseover');
	// 	// $(this).parents('').removeClass('editor-mouseover');
		
	// });
	// $('.editor-canvas').on('mouseleave', '.editor-block', function(e) {
	// 	$(this).removeClass('editor-mouseover');
	// 	// $(this).parents('[class^=editor-]').addClass('editor-mouseover');
	// });

	// $('.editor-canvas').on('mouseenter', '.editor-row', function(e) {
	// 	$(this).addClass('editor-mouseover');
	// 	$(this).parents('.editor-block').removeClass('editor-mouseover');
		
	// });
	// $('.editor-canvas').on('mouseleave', '.editor-row', function(e) {
	// 	$(this).removeClass('editor-mouseover');
	// 	$(this).parents('.editor-block').addClass('editor-mouseover');
	// });

	// $('.editor-canvas').on('mouseenter', '.editor-col', function(e) {
	// 	$(this).addClass('editor-mouseover');
	// 	$(this).parents('.editor-row').removeClass('editor-mouseover');
		
	// });
	// $('.editor-canvas').on('mouseleave', '.editor-col', function(e) {
	// 	$(this).removeClass('editor-mouseover');
	// 	$(this).parents('.editor-row').addClass('editor-mouseover');
	// });

	// $(document).on('click', '.editor-add-parent', function() {
	// 	var $this = $(this);

	// 	switch($this.data('action')) {
	// 		case 'addBlock':
	// 			$('.editor-canvas').append(getBlockHtml());
	// 			break;
	// 		case 'addRow':
	// 			console.log('Aqui', currentAction);
	// 			currentAction.element.append(getRowHtml());
	// 			break;
	// 	}
	// });

	// Jeito antigo por dropdown no container, não apagar até certeza que vai fazer do jeito novo
	// 
	// $('.editor-canvas').on('click', '.editor-add', function() {
	// 	console.log('Clico no Adicionar interna');
	// 	var $this = $(this);

	// 	// The container of the block content
	// 	if ($this.data('action') == 'addCol') {
	// 		$parent = $this.parents('.editor-block');
	// 	} else {
	// 		$parent = getParent($this);
	// 	}

	// 	currentAction = {
	// 		type: $this.data('action'),
	// 		element: $parent
	// 	};
	// 	openModalTextEdit();
	// });

	$('.editor-canvas').on('click', '.editor-col', function(e) {
		var $this = $(this);

		currentAction = {
			element: $this,
		};
		console.log('Container do momento', currentAction);
		e.stopPropagation();
	});
	$('.editor-canvas').on('click', '.editor-row', function() {
		var $this = $(this);

		currentAction = {
			element: $this,
		};
		console.log('Container do momento', currentAction);
	});

	$('.editor-tools').on('click', '.editor-add', function() {
		var $this = $(this);

		currentAction.type = $this.data('action');

		switch(currentAction.type) {
			case 'addBlock':
				$('.editor-canvas').append(getBlockHtml());
				break;
			case 'addRow':
				console.log('Aqui', currentAction);
				currentAction.element.children('.col').append(getRowHtml());
				break;
			case 'addCol':
				currentAction.element.append(getColHtml());
				break;
			default:
				openModalTextEdit();
				break;
		}
		
	});

	function modalControlsVisibility(show) {
		return;
		console.log('Controler do Modal para mostrar', show);
		$('[id^=editor-modal-group-control]').hide();
	
		for (var i = 0; i < show.length; i++) {
			$('#editor-modal-group-control-' + show[i]).fadeIn('fast', function() {
				if (i == 1) {
					$(this).find('input, textarea').focus();	
				}
				if (show[i] == 'list') {
			    	var $control = $(getControlListHtml());
			        $('#editor-modal-group-control-list').append($control);
			        $control.focus();
				}
			});
		}
	}

	function openModalTextEdit() {
		console.log('Action type', currentAction);
		switch (currentAction.type){
			case 'addText':
				modalControlsVisibility(['textarea']);
				break;
			case 'addInput':
				modalControlsVisibility(['input', 'lines']);
				break;
			case 'addLines':
				modalControlsVisibility(['lines']);
				break;
			case 'addList':
				modalControlsVisibility(['list', 'list-type']);
				break;
			case 'addDescription':
				modalControlsVisibility(['input']);
				break;
			case 'addCol':
				modalControlsVisibility(['lines']);
				break;
			default:
				console.error('Ação requisitada na modal não reconhecida', currentAction.type);
				break;
		}

		$('#modal-tools').modal('show');
	}
	$('.btn-save-action').click(function() {
		saveAction();
	})

	function saveAction() {
		console.log(currentAction);

		switch(currentAction.type) {
			case 'addText':
				currentAction.element.append('<p>' +$('#editor-modal-control-textarea').val()+ '</p>');
				break;
			case 'addInput':
				currentAction.element.append(getInputHtml($('#editor-modal-control-input').val()));
				currentAction.element.append(getLinesHtml($('#editor-modal-control-lines').val()));
				break;
			case 'addLines':
				currentAction.element.append(getLinesHtml($('#editor-modal-control-lines').val()));
				break;
			case 'addList':
				currentAction.element.append(getListHtml($('input[name^=editor-control-list]').serializeArray(), $('#editor-modal-control-list-type').val()));
				break;
			case 'addDescription':
				currentAction.element.append(getDescriptionHtml($('#editor-modal-control-input').val()));
				break;
			case 'addCol':
				var totalColsToAdd = $('#editor-modal-control-lines').val();
				for (var i = 0; i < totalColsToAdd; i++) {
					console.log("Adicionando Coluna");
					currentAction.element.append(getColHtml());
				}
				break;
			default:
				console.error('Ação não reconhecida', currentAction.type);
				break;
		}
		$('#editor-modal-form')[0].reset();
		$('#editor-modal-group-control-list').html('');
		$('#modal-tools').modal('toggle');
	}

	function getBlockHtml() {
		return `
			<div class="editor-block editor-parent row">
				<div class="col">
					<div class="editor-toolbox" style="display: none;">
						<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Adicionar ao bloco</button>
						<div class="dropdown-menu">
							<a href="#" class="editor-add-parent dropdown-item" data-action="addRow">Linha</a>
						</div>
					</div>
					${getRowHtml()}
				</div>
			</div>
		`;
	}

	function getRowHtml() {
		return `
			<div class="editor-row row">
				<button type="button" class="btn btn-default dropdown-toggle" style="display: none;" data-toggle="dropdown">Adicionar a linha</button>
				<div class="dropdown-menu">
					<a href="#" class="editor-add dropdown-item" data-action="addCol">Coluna</a>
				</div>
				${getColHtml()}
			</div>
		`;
	}

	function getColHtml() {
		return `
			<div class="editor-col col">
				<button type="button" class="dropdown-toggle btn btn-primary" style="display: none;" data-toggle="dropdown">Adicionar a coluna</button>
				<div class="dropdown-menu hidden">
					<a href="#!" class="editor-add dropdown-item" data-action="addText">Texto</a>
					<a href="#!" class="editor-add dropdown-item" data-action="addInput">Entrada</a>
					<a href="#!" class="editor-add dropdown-item" data-action="addLines">Linhas</a>
					<a href="#!" class="editor-add dropdown-item" data-action="addList">Lista</a>
					<a href="#!" class="editor-add dropdown-item" data-action="addDescription">Observação</a>
				</div>
			</div>
		`;
	}

	function generateRandonId() {
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
	}

	function getInputHtml(value) {
		return `
			<div>
				<h6>${value}</h6>
			</div>
		`;
	}

	function getDescriptionHtml(value) {
		return `
			<div>
				<h6><small><em>${value}</em></small></h6>
			</div>
		`;
	}

	function getListHtml(values, extraClasses) {
		var output = `
			<div>
				<ol class="editor-list  ${extraClasses}">
		`;

		for (var i = 0; i < values.length; i++) {
			output += `
				<li>${values[i].value}</li>
			`;
		}

		output += `
				<ol>	
			</div>`;

		return output;
	}

	function getLinesHtml(linesQt) {
		var output = `
			<div>
		`;

		for (var i = 0; i < linesQt; i++) {
			output += `
				<div class="editor-line"></div>
			`;
		}

		output += `</div>`;

		return output;
	}

	function getRandomId() {
		return Math.random();
	}
	function getParent($this) {
		return $this.parents('.editor-col');
	}

	function getControlListHtml() {
		return `
			<input type="text" name="editor-control-list[]" class="editor-control-list" placeholder="Adicionar e apertar enter para adicionar mais" autocomplete="off">
		`;		
	}

	$('.modal-content').on('keyup', '.editor-control-list', function(e) {
		var code = e.which; // recommended to use e.which, it's normalized across browsers
	    if(code==13)e.preventDefault();
	    if(code==13){
	    	var $control = $(getControlListHtml());
	        $('#editor-modal-group-control-list').append($control);
	        $control.focus();
	    }
	});

});