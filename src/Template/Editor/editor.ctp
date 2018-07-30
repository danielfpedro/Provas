<!-- CSS -->
<?= $this->Html->css('css/editor/editor.css', ['block' => true]) ?>
<!-- JS -->
<?= $this->Html->script('js/editor/editor.js', ['block' => true]) ?>

<div class="container-fluid">
	<div class="row">
		<div class="col-3 editor-tools">
			<ul class="nav flex-column editor-tools-block current">
				<li class="nav-item">
					<a href="#!" class="editor-add nav-link" data-action="addRow">Row</a>
				</li>
			</ul>
			<ul class="nav flex-column editor-tools-row">
				<li class="nav-item">
					<a href="#!" class="editor-add nav-link" data-action="addCol">Coluna</a>
				</li>
			</ul>
			<ul class="nav flex-column editor-tools-col">
				<li class="nav-item">
					<a href="#!" class="editor-add nav-link" data-action="addText">Texto</a>
					<a href="#!" class="editor-add nav-link" data-action="addList">Lista</a>
					<a href="#!" class="editor-add nav-link" data-action="addInput">Entrada</a>
					<a href="#!" class="editor-add nav-link" data-action="addLines">Linhas</a>
					<a href="#!" class="editor-add nav-link" data-action="addDescription">Observação</a>
				</li>
			</ul>
		</div>
		<div class="col-6 editor-canvas">
			<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Adicionar ao projeto</button>
			<div class='dropdown-menu'>
				<a href="#" class="editor-add-parent dropdown-item" data-action="addBlock">Bloco</a>
			</div>
		</div>
		<div class="col-3 editor-inspector">
		</div>
	</div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="modal-tools">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<form id="editor-modal-form">
			<div id="editor-modal-group-control-textarea" class="form-group">
				<label>Texto</label>
			  	<textarea id="editor-modal-control-textarea" class="form-control"></textarea>
		  	</div>

		  	<div id="editor-modal-group-control-input" class="form-group">
			  	<label>Entrada</label>
			  	<input type="text" id="editor-modal-control-input" class="form-control" autocomplete="off">
		  	</div>

		  	<div id="editor-modal-group-control-qtd" class="form-group">
			  	<label>Quantidade</label>
			  	<input type="text" id="editor-modal-control-qtd" class="form-control" autocomplete="off">
		  	</div>
			<div id="editor-modal-group-control-list"></div>
		  	<div id="editor-modal-group-control-list-type" class="form-group" autocomplete="off">
			  	<label>Tipo</label>
			  	<select id="editor-modal-control-list-type" class="form-control">
			  		<option value="editor-list-numeric" selected>Numérico</option>
			  		<option value="editor-list-u-alpha">Letras(Maiúsculo)</option>
			  		<option value="editor-list-l-alpha">Letras(Minúsculo)</option>
			  		<option value="editor-list-u-romain">Algarismos Ramanos(Maiúsculo)</option>
			  		<option value="editor-list-l-romain">Algarismos Ramanos(Minúsculo)</option>
			  		<option value="editor-list-blank-space">Lacuna para marcar</option>
			  	</select>
		  	</div>
	  	</form>
      </div>
      <div class="modal-footer">
      	<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btn-save-action">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Structure -->
<!-- <div id="modal1" class="modal">
<div class="modal-content">

</div>
	<div class="modal-footer">
	  <a href="#!" class="modal-action waves-effect waves-green btn-flat btn-save-action">Save</a>
	</div>
</div> -->