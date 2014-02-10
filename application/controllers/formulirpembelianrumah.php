<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require (APPPATH.'libraries/REST_Controller.php');

class Formulirpembelianrumah extends REST_Controller {

	function __construct(){
		parent::__construct();
		$this->load->library('ion_auth');
		$this->load->model('Modelrumah');
		$this->load->model('Modelformulirpembelianrumah');
		$this->load->model('Modelformulirpembelianrumah_bookingtemp');
		$this->output->set_content_type('application/json');
	}

	public function index_post(){
		
		!$this->ion_auth->is_sales() && exit($this->_msgerror("maaf, hanya user sales yang bisa melakukan formulir pembelian rumah sebagai pemandu formulir pembelian rumah"));
		
		$result = $this->Modelformulirpembelianrumah->get_rumahid_isexist($this->post('rumah_id'));
		count($result) && exit($this->_msgError("maaf, rumah di ". $result->blok_nama . " no " . $result->no . " sudah ada yang memesan terlebih dahulu"));

		$result = $this->Modelformulirpembelianrumah_bookingtemp->get_rumahidandexceptthisuserid_isexist($this->post('rumah_id'), $this->session->userdata('user_id'));
		count($result) && exit($this->_msgerror("maaf, rumah di ". $result->blok_nama . " no " . $result->no . " sudah ada yang memesan terlebih dahulu"));

		$post_data = file_get_contents("php://input");
		$data = json_decode($post_data);
		$data->user_id = $this->session->userdata('user_id');
		$data->status_id = '1';
		$result = $this->Modelformulirpembelianrumah->insert($data);
		if (!$result == 1)
			exit($this->_msgerror("maaf, terjadi kesalahan dan tidak dapat menyimpan data formulir pembelian rumah, harap mengubungi admin"));
		
		$this->Modelformulirpembelianrumah_bookingtemp->delete_byuserid($this->session->userdata('user_id'));

		$this->output->set_output("berhasil menyimpan data formulir pembelian rumah");
	}
	public function booking_post($rumah_id){
		
		!$this->ion_auth->is_sales() && exit($this->_msgerror("maaf, hanya user sales yang bisa melakukan formulir pembelian rumah sebagai pemandu formulir pembelian rumah"));

		$result = $this->Modelformulirpembelianrumah->get_rumahid_isexist($rumah_id);
		count($result) && exit($this->_msgError("maaf, rumah di ". $result->blok_nama . " no " . $result->no . " sudah ada yang memesan terlebih dahulu"));


		$result = $this->Modelformulirpembelianrumah_bookingtemp->get_rumahidandexceptthisuserid_isexist($rumah_id, $this->session->userdata('user_id'));
		count($result) && exit($this->_msgerror("maaf, rumah di ". $result->blok_nama . " no " . $result->no . " sudah ada yang memesan terlebih dahulu"));


		$this->Modelformulirpembelianrumah_bookingtemp->delete_byuserid($this->session->userdata('user_id'));

		$affected_rows = $this->Modelformulirpembelianrumah_bookingtemp->insert($rumah_id, $this->session->userdata('user_id'));
		
		if($affected_rows==1){
			$result = $this->Modelrumah->get_byid($rumah_id);
			$this->output->set_output(json_encode($result));
		}else
			exit($this->_msgerror("maaf, terjadi kesalahan sistem. harap menghubungi admin untuk mengatasi kesalahan ini"));

	}
	public function booking_delete($rumah_id){
		!$this->ion_auth->is_sales() && exit($this->_msgerror("maaf, hanya user sales yang bisa melakukan formulir pembelian rumah sebagai pemandu formulir pembelian rumah"));

		$this->Modelformulirpembelianrumah_bookingtemp->delete_byuseridandrumahid($this->session->userdata('user_id'), $rumah_id);
	}
	private function _msgerror($msg){
		$this->output->set_content_type('text/html');
		$this->output->set_status_header('500');
		$this->output->set_output($msg);
		$this->output->_display();
	}
}