DROP TABLE IF EXISTS hospital_desc;
CREATE EXTERNAL TABLE IF NOT EXISTS hospital_desc(
    hospital_id int,
    hospital_desc_add string,
    hospital_desc_parking int,
    hospital_desc_device string,
    hospital_desc_special string
);
INSERT OVERWRITE TABLE hospital_desc
        SELECT
                h.hospital_id
                ,ht.htmp_add
                ,ht4.htmp4_parking
                ,(select concat_ws('/', collect_list(htmp7_codename))
                        from hospital_7_tmp
                        where h.hospital_secu=htmp7_secu
                        group by htmp7_secu) as hospital_desc_device
                ,(select concat_ws('/' , collect_list(htmp10_special))
                        from hospital_10_tmp
                        where h.hospital_secu=htmp10_secu
                        group by htmp10_secu)
        FROM hospital h,
                hospital_tmp ht,
                hospital_4_tmp ht4
        where h.hospital_secu=ht.htmp_secu
                and h.hospital_secu=ht4.htmp4_secu;
