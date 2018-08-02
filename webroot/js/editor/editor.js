$(function() {

	// Adiciono o primeiro bloc assim que a pagina carrega

	// $('.modal').modal();
	// $('.editor-canvas').sortable();

	var $currentText = null;
	var currentAction = {type: null, element: null};
	init();

	function init() {
		$('.editor-add').addClass('disabled');

		addBlock();
		$('[data-toggle="tooltip"]').tooltip();
	}
	// $('select').formSelect();

	// $('.editor-tools ul').not('.current').hide();

	// $('.editor-canvas').on('click', '.editor-component', function(e) {
		
	// 	var $this = $(this);

	// 	currentAction.element = $this;

		
	// 	clearInspector();
	// 	setInspectorTitle($this);
	// 	montaControls($this.data('controls'));
		
	// 	// currentAction.type = $this.data('action');
	// 	// currentAction.editing = true;

	// 	// switch(currentAction.type) {
	// 	// 	case 'addText':
	// 	// 		$('#editor-modal-control-textarea').val($this.text());
	// 	// 	case 'addInput':
	// 	// 		$('#editor-modal-control-input').val($this.text());
	// 	// 		break;
	// 	// }

	// 	// openModalTextEdit();
	// 	e.stopPropagation();
	// });

	function addBlock()
	{
		$('.editor-canvas').append(getBlockHtml());
	}

	function setInspectorTitle($this) {
		var title = [];

		title.push(currentAction.element.attr('data-original-title'));

		$this.parentsUntil('.editor-canvas').each(function(t) {
			console.log('$(this)', $(this).prop('tagName'));
			console.log('Title', $(this).attr('data-original-title'));
			if ($(this).attr('data-original-title')) {
				title.push($(this).attr('data-original-title'));
			}
			
		});

		$('.editor-inspector').append("<h3>"+title.reverse().join(' > ')+"</h3>");
	}

	$('.editor-inspector').on('keyup', '.editor-inspector-control-text', function(e) {
		currentAction.element.text($(this).val());
	});

	$('.editor-inspector').on('input', '.editor-inspector-control-pautas-qtd', function(e) {
		var $this = $(this);
		var totalPautas = currentAction.element.children().length;
		var desired = parseInt($this.val());
		var dif = totalPautas - desired;

		$this.siblings('label').find('span').text($this.val());

		if (dif < 0) {
			for (var i = 0; i < Math.abs(dif); i++) {
				currentAction.element.append(getPautaHtml());
			}
		} else if (dif > 0) {
			for (var i = 0; i < Math.abs(dif); i++) {
				console.log('Aqui', currentAction.element.children().last());

				currentAction.element.children().last().remove();
			}
		}
	});

	function getPautaHtml() {
		return `
			<div class="editor-line"></div>
		`;
	}

	function getControlTextHtml(value) {
		var id = getRandomId();
		return `
			<div class="form-group">
				<label for="${id}">Texto</label>
				<textarea id="${id}" class="form-control editor-inspector-control editor-inspector-control-text">${value}</textarea>
			</div>
		`;
	}


	// $('.editor-canvas').on('click', '.editor-edit-component', function(e) {
	// 	console.log('Pimba');
	// 	e.stopPropagation();
	// 	var $this = $(this);

	// 	currentAction.element = $this;
	// 	currentAction.type = $this.data('action');
	// 	currentAction.editing = true;

	// 	switch(currentAction.type) {
	// 		case 'addText':
	// 			$('#editor-modal-control-textarea').val($this.text());
	// 		case 'addInput':
	// 			$('#editor-modal-control-input').val($this.text());
	// 			break;
	// 	}

	// 	openModalTextEdit();

	// });


	$('body').on('click', '.editor-canvas, .editor-block, .editor-row, .editor-col, .editor-component', function(e) {
		var $this = $(this);
		currentAction.element = $this;
		setSelected($this);
		var tools = [];

		if ($this.data('tools')) {
			tools = $this.data('tools').split(',');	
		}
		
		console.log('Tools', tools);

		clearInspector();
		setInspectorTitle($this);
		montaControls($this.data('controls'));

		montaTools(tools);
		// var currentClass = '';
		// if ($this.hasClass('editor-block')) {
		// 	currentClass = 'block';
		// } else if($this.hasClass('editor-row')) {
		// 	currentClass = 'row';
		// } else if($this.hasClass('editor-col')) {
		// 	currentClass = 'col';
		// }

		// $('.editor-tools ul.current').fadeOut('fast', function() {
		// 	$(this).removeClass('current');
		// 	$('.editor-tools ul.editor-tools-' + currentClass).fadeIn('fast', function() {
		// 		$(this).addClass('current');
		// 	});
		// });

		e.stopPropagation();
	});

	function montaTools(tools)
	{
		$('.editor-add').addClass('disabled');
		
		if (!tools) {
			return;
		}
		
		for (var i = 0; i < tools.length; i++) {
			$('.editor-tool-add-' + tools[i]).removeClass('disabled');
		}
	}

	function setSelected($this)
	{
		$('.editor-canvas div, .editor-canvas p').removeClass('editor-mouseover');
		console.log('Set selected to', $this);
		$this.addClass('editor-mouseover');
	}

	$('.editor-inspector').on('click', '.editor-inspector-control-btn-delete', function(e) {
		var toDelete = currentAction.element;

		if (currentAction.element.hasClass('editor-col') && currentAction.element.siblings().length < 1) {
			// Caso só tenha uma coluna deleta a linha inteira
			toDelete = currentAction.element.parent();
			// Não pode deletar se o bloco só possuir uma linha
			if (toDelete.siblings().length < 1) {
				alert('O Bloco deve ter no mínimo uma linha');
				return;
			}
		}

		// if (currentAction.element.hasClass('editor-row')) {
		// 	if (currentAction.element.siblings().length < 1) {

		// 	}
		// }

		toDelete.fadeOut('fast', function() {
			$(this).remove();
		});
		clearInspector();
	});
	// $('.editor-canvas').on('click', '.editor-col', function(e) {
	// 	var $this = $(this);

	// 	currentAction = {
	// 		element: $this,
	// 	};
	// 	console.log('Click Col');
	// 	e.stopPropagation();
	// });
	// $('.editor-canvas').on('click', '.editor-row', function(e) {
	// 	var $this = $(this);

	// 	currentAction = {
	// 		element: $this,
	// 	};
	// 	console.log('Click Row');
	// 	e.stopPropagation();
	// });

	$('.editor-canvas').on('mouseover', '.editor-block, .editor-col, .editor-component', function(e) {
		console.log('OVER', $(this).attr('data-original-title'));
		
		
		$('[data-toggle="tooltip"]').tooltip('hide');
		$(this).tooltip('toggle');
		e.stopPropagation();
	});

	$('.editor-tools').on('click', '.editor-add', function() {
		var $this = $(this);

		if ($this.hasClass('disabled')) {
			return;
		}

		currentAction.type = $this.data('action');
		currentAction.editing = false;

		// $('#editor-modal-form')[0].reset();

		switch(currentAction.type) {
			case 'addBlock':
				addBlock();
				break;
			case 'addRow':
				currentAction.element.children('.col').append(getRowHtml());
				break;
			case 'addText':
				var $element = $(getTextHtml('Inserir o texto aqui!'));
				currentAction.element.append($element);
				currentAction.element = $element;
				clearInspector();
				setInspectorTitle(currentAction.element);
				montaControls(currentAction.element.data('controls'));
				setSelected(currentAction.element);

				montaTools(currentAction.element.data('tools'));
				break;
			case 'addInput':
				var value = $('#editor-modal-control-input').val();
				var valueQtd = $('#editor-modal-control-qtd').val();

				if (!currentAction.editing) {
					currentAction.element.append(getInputHtml(value));
					currentAction.element.append(getLinesHtml(valueQtd));
				} else {
					currentAction.element.text(value);
				}
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
				currentAction.element.parent().append(getColHtml());
				break;
			case 'addPautas':
				currentAction.element.append(getPautasHtml());
				break;
			default:
				console.error('Ação não reconhecida', currentAction.type);
				break;
		}

		$('[data-toggle="tooltip"]').tooltip();

	// 	// switch(currentAction.type) {
	// 	// 	case 'addBlock':
	// 	// 		$('.editor-canvas').append(getBlockHtml());
	// 	// 		break;
	// 	// 	case 'addRow':
	// 	// 		console.log('Aqui', currentAction);
	// 	// 		currentAction.element.children('.col').append(getRowHtml());
	// 	// 		break;
	// 	// 	case 'addCol':
	// 	// 		currentAction.element.append(getColHtml());
	// 	// 		break;
	// 	// 	default:
	// 	// 		// openModalTextEdit();
	// 	// 		break;
	// 	// }
		
	});

	function modalControlsVisibility(show) {
		console.log('Controler do Modal para mostrar', show);
		$('[id^=editor-modal-group-control]').hide();
	
		for (var i = 0; i < show.length; i++) {
			$('#editor-modal-group-control-' + show[i]).show()
			if (i == 1) {
				$(this).find('input, textarea').focus();	
			}
			console.log('Pim', show[i]);
			if (show[i] == 'list') {
				console.log('Aqui');
		    	var $control = $(getControlListHtml());
		        $('#editor-modal-group-control-list').append($control);
		        $control.focus();
			}
		}
	}

	function openModalTextEdit() {
		console.log('Open modal Action type', currentAction);
		switch (currentAction.type){
			case 'addText':
				modalControlsVisibility(['textarea']);
				break;
			case 'addInput':
				modalControlsVisibility(['input', 'qtd']);
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

	// function saveAction() {
	// 	console.log(currentAction);

	// 	switch(currentAction.type) {
	// 		case 'addText':
	// 			var value = $('#editor-modal-control-textarea').val();
	// 			if (!currentAction.editing) {
	// 				currentAction.element.append('<p class="editor-edit-component" data-action="addText">' +value+ '</p>');
	// 			} else {
	// 				currentAction.element.text(value);
	// 			}
				
	// 			break;
	// 		case 'addInput':
	// 			var value = $('#editor-modal-control-input').val();
	// 			var valueQtd = $('#editor-modal-control-qtd').val();

	// 			if (!currentAction.editing) {
	// 				currentAction.element.append(getInputHtml(value));
	// 				currentAction.element.append(getLinesHtml(valueQtd));
	// 			} else {
	// 				currentAction.element.text(value);
	// 			}
	// 			break;
	// 		case 'addLines':
	// 			currentAction.element.append(getLinesHtml($('#editor-modal-control-lines').val()));
	// 			break;
	// 		case 'addList':
	// 			currentAction.element.append(getListHtml($('input[name^=editor-control-list]').serializeArray(), $('#editor-modal-control-list-type').val()));
	// 			break;
	// 		case 'addDescription':
	// 			currentAction.element.append(getDescriptionHtml($('#editor-modal-control-input').val()));
	// 			break;
	// 		case 'addCol':
	// 			console.log('Aqui adicinando coluina');
	// 			var totalColsToAdd = $('#editor-modal-control-lines').val();
	// 			for (var i = 0; i < totalColsToAdd; i++) {
	// 				console.log("Adicionando Coluna");
	// 				currentAction.element.append(getColHtml());
	// 			}
	// 			break;
	// 		default:
	// 			console.error('Ação não reconhecida', currentAction.type);
	// 			break;
	// 	}
		
	// 	$('#editor-modal-group-control-list').html('');
	// 	$('#modal-tools').modal('toggle');
	// }

	function getBlockHtml() {
		return `
			<div class="editor-block row editor-component" data-tools="row" data-controls="delete" data-toggle="tooltip" title="Bloco">
				<div class="col">
					${getRowHtml()}
				</div>
			</div>
		`;
	}

	function getRowHtml() {
		return `
			<div class="editor-row row editor-component" data-tools="col" data-controls="delete" data-toggle="tooltip" title="Linha">
				${getColHtml()}
			</div>
		`;
	}

	function getColHtml() {
		return `
			<div class="editor-col col editor-component" data-tools="col,text,pautas" data-controls="delete" data-toggle="tooltip" title="Coluna">
			</div>
		`;
	}

	function montaControls(controlsString){
		if (!controlsString) {
			return;
		}
		var controls = controlsString.split(',');
		var controlsHtml = '';
		for (var i = 0; i < controls.length; i++) {
			switch(controls[i]) {
				case 'text':
					var $textControl = getControlTextHtml(currentAction.element.text());
					controlsHtml += $textControl;
					break;
				case 'delete':
					controlsHtml += getControlDeleteHtml();
					break;
				case 'pautasQtd':
					controlsHtml += getControlPautasQtdHtml();
					break;
				default:
					console.error('Control não recohecido');
					break;
			}
		}

		$('.editor-inspector').append(controlsHtml);
		$('.editor-inspector').find('input, textarea').focus();
	}

	function getControlPautasQtdHtml() {
		var randomId = getRandomId();
		return `
		  <div class="form-group">
		    <label for="${randomId}">Quantidade de Pautas (<span>1</span>)</label>
		    <input type="range" class="form-control-range editor-inspector-control-pautas-qtd" id="${randomId}" min="1" max="100" step="1" value="1">
		  </div>
		`;
	}

	function getControlDeleteHtml() {
		return `
			<button type="button" class="btn btn-danger editor-inspector-control-btn-delete">Deletar</button>
		`;
	}

	function generateRandonId() {
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
	}

	function getPautasHtml() {
		return `
			<div class="editor-component" data-controls="pautasQtd,delete" data-toggle="tooltip" title="Pautas">
				<div class="editor-line"></div>
			</div>
		`;
	}

	function getTextHtml(value) {
		return `
			<p class="editor-component" data-controls="text,delete" data-toggle="tooltip" title="Texto">${value}</p>
		`;
	}

	function getInputHtml(value) {
		return `
			<div>
				<h6 class="editor-edit-component" data-action="addInput">${value}</h6>
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
			<div class="form-group">
				<input type="text" autocomplete="off" name="editor-control-list[]" class="form-control editor-control-list" placeholder="Adicionar e apertar enter para adicionar mais">
			</div>
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

	function clearInspector() {
		$('.editor-inspector').html('');
	}

});