<?php defined('BASEPATH') OR exit('No direct script access allowed');
require (APPPATH.'libraries/REST_Controller.php');

class Auth extends REST_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('ion_auth');
		$this->output->set_content_type('application/json');
	}

	function index_get(){
		if ($this->ion_auth->logged_in())
			$this->output->set_output(json_encode($this->_username_get()));
		else
			exit($this->_msgerror("anda harus login terlebih dahulu"));
	}

	function index_post(){
		$this->ion_auth->logged_in() && $this->ion_auth->logout();
		$data = json_decode(file_get_contents("php://input"));
		if(!$this->ion_auth->login($data->username, $data->password, (bool) $data->rememberme))
			exit($this->_msgerror("maaf, username atau password anda kurang benar"));
		$this->output->set_output(json_encode($this->_username_get()));
	}

	function usergroup_get(){
		$this->output->set_output(json_encode($this->ion_auth->get_users_groups()->result()));
	}

	function login_groupsales_get(){
		if (!$this->ion_auth->is_sales())
			exit($this->_msgerror("anda harus login terlebih dahulu sebagai sales"));
		else
			$this->output->set_output(json_encode($this->_username_get()));
	}

	function login_groupsales_post()
	{
		if (!$this->ion_auth->logged_in())
			$this->ion_auth->logout();

		if (!$this->ion_auth->login_groupsales($this->input->post('username'), $this->input->post('password'), (bool) $this->input->post('rememberme')))
			exit($this->_msgerror("username atau password anda kurang benar atau anda belum memiliki hak akses sebagai sales"));
		else
			$this->output->set_output(json_encode($this->_username_get()));
	}

	function logout_get()
	{
		$this->output->set_content_type('text/html');
		$this->ion_auth->logout();
	}

	private function _username_get(){
		return array(
			'username' => $this->ion_auth->user()->row()->username
		);
	}
	private function _msgerror($msg){
		$this->output->set_content_type('text/html');
		$this->output->set_status_header('500');
		$this->output->set_output($msg);
		$this->output->_display();
	}
}