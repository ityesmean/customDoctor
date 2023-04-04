package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QHospitalMy is a Querydsl query type for HospitalMy
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHospitalMy extends EntityPathBase<HospitalMy> {

    private static final long serialVersionUID = -1402414802L;

    public static final QHospitalMy hospitalMy = new QHospitalMy("hospitalMy");

    public final NumberPath<Long> hospital_id = createNumber("hospital_id", Long.class);

    public final BooleanPath hospital_my_del = createBoolean("hospital_my_del");

    public final NumberPath<Long> hospital_my_id = createNumber("hospital_my_id", Long.class);

    public final NumberPath<Long> user_id = createNumber("user_id", Long.class);

    public QHospitalMy(String variable) {
        super(HospitalMy.class, forVariable(variable));
    }

    public QHospitalMy(Path<? extends HospitalMy> path) {
        super(path.getType(), path.getMetadata());
    }

    public QHospitalMy(PathMetadata metadata) {
        super(HospitalMy.class, metadata);
    }

}

