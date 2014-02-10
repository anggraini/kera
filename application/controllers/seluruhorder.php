<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require (APPPATH.'libraries/REST_Controller.php');

class Seluruhorder extends REST_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('Modelseluruhrumah');
		$this->output->set_content_type('application/json');
	}

	public function index_get(){
		$result = $this->Modelseluruhrumah->get_rumah();
        $this->output->set_output(json_encode($result));
	}

	public function id_get($id){
		$result = $this->Modelseluruhrumah->get_byid($id);
    	$this->output->set_output(json_encode($result));
	}

	public function rumahstatus_get($id){
		$result = $this->Modelseluruhrumah->get_rumahstatus($id);
    	$this->output->set_output(json_encode($result));
	}

	public function blokandno_get(){
		$result = $this->Modelseluruhrumah->blokandno_get();
    	$this->output->set_output(json_encode($result));
	}

}