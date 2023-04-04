package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDrugAvoid is a Querydsl query type for DrugAvoid
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDrugAvoid extends EntityPathBase<DrugAvoid> {

    private static final long serialVersionUID = -1069625075L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDrugAvoid drugAvoid = new QDrugAvoid("drugAvoid");

    public final QDrug drug;

    public final NumberPath<Integer> drug_avoid_b = createNumber("drug_avoid_b", Integer.class);

    public final StringPath drug_avoid_desc = createString("drug_avoid_desc");

    public final NumberPath<Long> drug_avoid_id = createNumber("drug_avoid_id", Long.class);

    public final StringPath drug_avoid_name_b = createString("drug_avoid_name_b");

    public QDrugAvoid(String variable) {
        this(DrugAvoid.class, forVariable(variable), INITS);
    }

    public QDrugAvoid(Path<? extends DrugAvoid> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDrugAvoid(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDrugAvoid(PathMetadata metadata, PathInits inits) {
        this(DrugAvoid.class, metadata, inits);
    }

    public QDrugAvoid(Class<? extends DrugAvoid> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.drug = inits.isInitialized("drug") ? new QDrug(forProperty("drug"), inits.get("drug")) : null;
    }

}

