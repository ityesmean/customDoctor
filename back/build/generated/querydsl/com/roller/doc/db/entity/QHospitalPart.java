package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHospitalPart is a Querydsl query type for HospitalPart
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHospitalPart extends EntityPathBase<HospitalPart> {

    private static final long serialVersionUID = 899176181L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHospitalPart hospitalPart = new QHospitalPart("hospitalPart");

    public final QHospital hospital;

    public final NumberPath<Integer> hospital_part_doctor = createNumber("hospital_part_doctor", Integer.class);

    public final NumberPath<Integer> hospital_part_id = createNumber("hospital_part_id", Integer.class);

    public final NumberPath<Integer> hospital_part_name = createNumber("hospital_part_name", Integer.class);

    public QHospitalPart(String variable) {
        this(HospitalPart.class, forVariable(variable), INITS);
    }

    public QHospitalPart(Path<? extends HospitalPart> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHospitalPart(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHospitalPart(PathMetadata metadata, PathInits inits) {
        this(HospitalPart.class, metadata, inits);
    }

    public QHospitalPart(Class<? extends HospitalPart> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.hospital = inits.isInitialized("hospital") ? new QHospital(forProperty("hospital"), inits.get("hospital")) : null;
    }

}

