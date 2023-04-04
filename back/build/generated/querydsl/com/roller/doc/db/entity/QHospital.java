package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHospital is a Querydsl query type for Hospital
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHospital extends EntityPathBase<Hospital> {

    private static final long serialVersionUID = 901332962L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHospital hospital = new QHospital("hospital");

    public final StringPath hospital_code = createString("hospital_code");

    public final NumberPath<Long> hospital_id = createNumber("hospital_id", Long.class);

    public final StringPath hospital_name = createString("hospital_name");

    public final StringPath hospital_tel = createString("hospital_tel");

    public final NumberPath<Double> hospital_x = createNumber("hospital_x", Double.class);

    public final NumberPath<Double> hospital_y = createNumber("hospital_y", Double.class);

    public final ListPath<HospitalPart, QHospitalPart> hospitalParts = this.<HospitalPart, QHospitalPart>createList("hospitalParts", HospitalPart.class, QHospitalPart.class, PathInits.DIRECT2);

    public final QHospitalTime hospitalTime;

    public QHospital(String variable) {
        this(Hospital.class, forVariable(variable), INITS);
    }

    public QHospital(Path<? extends Hospital> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHospital(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHospital(PathMetadata metadata, PathInits inits) {
        this(Hospital.class, metadata, inits);
    }

    public QHospital(Class<? extends Hospital> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.hospitalTime = inits.isInitialized("hospitalTime") ? new QHospitalTime(forProperty("hospitalTime"), inits.get("hospitalTime")) : null;
    }

}

