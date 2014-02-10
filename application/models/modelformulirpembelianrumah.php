<?php
class ModelFormulirpembelianrumah extends CI_Model{
	function __construct()
	{
		parent::__construct();
	}

	function get_rumahid_isexist($rumah_id){
		$param = "select a.rumah_id, c.nama blok_nama, b.no  from tbl_formulirpembelianrumah a 
		left join tbl_rumah b on a.rumah_id = b.id 
		left join tbl_blok c on b.blok_id = c.id 
		where a.rumah_id = ?";
		$query = $this->db->query($param ,$rumah_id);
		return $query->row();
	}

	function insert($data){
		$this->db->insert('tbl_formulirpembelianrumah', $data);
		return $this->db->affected_rows();
	}
}