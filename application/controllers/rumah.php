<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require (APPPATH.'libraries/REST_Controller.php');

class Rumah extends REST_Controller {

	function __construct(){
		parent::__construct();
		$this->load->model('Modelrumah');
		$this->output->set_content_type('application/json');
	}

	public function index_get(){
		$result = $this->Modelrumah->get_rumah();
        $this->output->set_output(json_encode($result));
	}

	public function id_get($id){
		$result = $this->Modelrumah->get_byid($id);
    	$this->output->set_output(json_encode($result));
	}

	public function rumahstatus_get($id){
		$result = $this->Modelrumah->get_rumahstatus($id);
    	$this->output->set_output(json_encode($result));
	}

	public function blokandno_get(){
		$result = $this->Modelrumah->blokandno_get();
    	$this->output->set_output(json_encode($result));
	}
}