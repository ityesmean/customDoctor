package com.roller.doc.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHospitalTime is a Querydsl query type for HospitalTime
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHospitalTime extends EntityPathBase<HospitalTime> {

    private static final long serialVersionUID = 899302863L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHospitalTime hospitalTime = new QHospitalTime("hospitalTime");

    public final QHospital hospital;

    public final NumberPath<Long> hospital_time_id = createNumber("hospital_time_id", Long.class);

    public final StringPath hospitalTimeEtc = createString("hospitalTimeEtc");

    public final StringPath hospitalTimeFri = createString("hospitalTimeFri");

    public final NumberPath<Integer> hospitalTimeFriNight = createNumber("hospitalTimeFriNight", Integer.class);

    public final NumberPath<Integer> hospitalTimeHoliday = createNumber("hospitalTimeHoliday", Integer.class);

    public final StringPath hospitalTimeMon = createString("hospitalTimeMon");

    public final NumberPath<Integer> hospitalTimeMonNight = createNumber("hospitalTimeMonNight", Integer.class);

    public final StringPath hospitalTimeSat = createString("hospitalTimeSat");

    public final NumberPath<Integer> hospitalTimeSatNight = createNumber("hospitalTimeSatNight", Integer.class);

    public final StringPath hospitalTimeSun = createString("hospitalTimeSun");

    public final NumberPath<Integer> hospitalTimeSunNight = createNumber("hospitalTimeSunNight", Integer.class);

    public final StringPath hospitalTimeThu = createString("hospitalTimeThu");

    public final NumberPath<Integer> hospitalTimeThuNight = createNumber("hospitalTimeThuNight", Integer.class);

    public final StringPath hospitalTimeTue = createString("hospitalTimeTue");

    public final NumberPath<Integer> hospitalTimeTueNight = createNumber("hospitalTimeTueNight", Integer.class);

    public final StringPath hospitalTimeWed = createString("hospitalTimeWed");

    public final NumberPath<Integer> hospitalTimeWedNight = createNumber("hospitalTimeWedNight", Integer.class);

    public QHospitalTime(String variable) {
        this(HospitalTime.class, forVariable(variable), INITS);
    }

    public QHospitalTime(Path<? extends HospitalTime> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHospitalTime(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHospitalTime(PathMetadata metadata, PathInits inits) {
        this(HospitalTime.class, metadata, inits);
    }

    public QHospitalTime(Class<? extends HospitalTime> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.hospital = inits.isInitialized("hospital") ? new QHospital(forProperty("hospital"), inits.get("hospital")) : null;
    }

}

