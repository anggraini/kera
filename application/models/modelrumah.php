<?php
class Modelrumah extends CI_Model{
	function __construct()
	{
		parent::__construct();
	}

	function get_rumah()
	{
		$param = "select a.id,a.rumahstatus_id, b.nama blok_nama, c.nama tipe_nama, d.nama rumahstatus_nama,
		CONCAT(replace(LOWER(b.nama),' ',''),'_',LOWER(a.no)) rumah_id
		from tbl_rumah a
		left join tbl_blok b on a.blok_id = b.id
		left join tbl_tipe c on a.tipe_id = c.id
		left join tbl_rumahstatus d on a.rumahstatus_id = d.id";

		$query = $this->db->query($param);
		return $query->result();
	}

	function get_byid($id)
	{
		$param = "select a.*, b.nama blok_nama, c.nama tipe_nama, d.nama rumahstatus_nama,
		CONCAT(replace(LOWER(b.nama),' ',''),'_',LOWER(a.no)) rumah_id 
		from tbl_rumah a
		left join tbl_blok b on a.blok_id = b.id
		left join tbl_tipe c on a.tipe_id = c.id
		left join tbl_rumahstatus d on a.rumahstatus_id = d.id
		where a.id=?";
		$query = $this->db->query($param ,$id);
		return $query->row();
	}

	function get_rumahstatus($id)
	{
		$param = "select id, rumahstatus_id from tbl_rumah where id = ?";
		$query = $this->db->query($param, $id);
		return $query->row();
	}

	function blokandno_get()
	{
		$param = "select b.nama blok, a.no, a.id from tbl_rumah a, tbl_blok b where a.blok_id = b.id order by a.id";
		$query = $this->db->query($param);
		return $query->result();
	}
} ?>