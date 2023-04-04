package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QHospitalDesc is a Querydsl query type for HospitalDesc
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHospitalDesc extends EntityPathBase<HospitalDesc> {

    private static final long serialVersionUID = 898822547L;

    public static final QHospitalDesc hospitalDesc = new QHospitalDesc("hospitalDesc");

    public final StringPath hospital_desc_add = createString("hospital_desc_add");

    public final StringPath hospital_desc_device = createString("hospital_desc_device");

    public final NumberPath<Integer> hospital_desc_parking = createNumber("hospital_desc_parking", Integer.class);

    public final StringPath hospital_desc_special = createString("hospital_desc_special");

    public final NumberPath<Long> hospital_id = createNumber("hospital_id", Long.class);

    public QHospitalDesc(String variable) {
        super(HospitalDesc.class, forVariable(variable));
    }

    public QHospitalDesc(Path<? extends HospitalDesc> path) {
        super(path.getType(), path.getMetadata());
    }

    public QHospitalDesc(PathMetadata metadata) {
        super(HospitalDesc.class, metadata);
    }

}

