<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require (APPPATH.'libraries/REST_Controller.php');

class Pilihrumah extends REST_Controller {
	function __construct(){
		parent::__construct();
		$this->load->library('ion_auth');
		$this->load->model('Modelpilihrumah');
		$this->output->set_content_type('application/json');
	}

	public function blokandno_get(){
		$result = $this->Modelpilihrumah->blokandno_get();
    	$this->output->set_output(json_encode($result));
	}
}