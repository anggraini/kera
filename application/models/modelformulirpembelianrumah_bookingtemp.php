<?php
class Modelformulirpembelianrumah_bookingtemp extends CI_Model{
	function __construct()
	{
		parent::__construct();
	}

	function get_rumahidandexceptthisuserid_isexist($rumah_id, $user_id){
		$param = "select * from tbl_formulirpembelianrumah_bookingtemp a 
		left join tbl_rumah b on a.rumah_id = b.id 
		left join tbl_blok c on b.blok_id = c.id 
		where a.rumah_id = ? and a.user_id != ?";
		$query = $this->db->query($param ,array($rumah_id, $user_id));
		return $query->row();
	}

	function delete_byuserid($user_id){
		$param = "delete from tbl_formulirpembelianrumah_bookingtemp where user_id = ?";
		$this->db->query($param, $user_id);
	}

	function insert($rumah_id, $user_id){
		$param = "insert into tbl_formulirpembelianrumah_bookingtemp values(?, ?, null)";
		$query = $this->db->query($param, array($rumah_id, $user_id));
		return $this->db->affected_rows();
	}
}