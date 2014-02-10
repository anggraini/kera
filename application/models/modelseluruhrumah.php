<?php
class Modelseluruhrumah extends CI_Model{
	function __construct()
	{
		parent::__construct();
	}

	function get_rumah()
	{
		$param = "select a.id,a.rumahstatus_id,a.tipe_id, a.no, a.harga, b.nama blok_nama, c.nama tipe_nama, d.nama rumahstatus_nama,
		CONCAT(replace(LOWER(b.nama ),' ',' '),' ',LOWER(a.no)) rumah_id
		from tbl_rumah a
		left join tbl_blok b on a.blok_id = b.id
		left join tbl_tipe c on a.tipe_id = c.id
		left join tbl_rumahstatus d on a.rumahstatus_id = d.id";

		$query = $this->db->query($param);
		return $query->result();
	}
}